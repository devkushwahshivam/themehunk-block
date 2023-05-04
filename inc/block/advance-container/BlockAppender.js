import { useSelect } from '@wordpress/data';
import { Inserter } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Icon, Tooltip } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { plus } from '@wordpress/icons';

function getInnerBlocksCount(clientId) {
	const block = useSelect((select) => {
	  return select('core/block-editor').getBlock(clientId);
	});
  
	return block ? block.innerBlocks.length : 0;
  }
  
export default ( { clientId, isSelected, attributes } ) => {
	const { isBlockPreview } = attributes;
	const innerBlocksCount = getInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;
	const { selectBlock } = useDispatch( 'core/block-editor' );

	let appender = false;

	if ( isBlockPreview ) {
		return false;
	}

	function ButtonBlockAppender() {
		return (
			<Inserter
				position="bottom right"
				rootClientId={ clientId }
				__experimentalIsQuick
				renderToggle={ ( {
					onToggle,
					disabled,
					isOpen,
					blockTitle,
					hasSingleBlockType,
				} ) => {
					const label = hasSingleBlockType
						? sprintf(
							// translators: %s: the name of the block when there is only one
							_x( 'Add %s', 'directly add the only allowed block', 'themehunk-block' ),
							blockTitle
						) : _x( 'Add block', 'Generic label for block inserter button', 'themehunk-block' );

					return (
						<Tooltip text={ label }>
							<Button
								className={ 'block-editor-button-block-appender' }
								onClick={ onToggle }
								aria-haspopup={ ! hasSingleBlockType ? 'true' : undefined }
								aria-expanded={ ! hasSingleBlockType ? isOpen : undefined }
								disabled={ disabled }
								label={ label }
							>
								<Icon icon={ plus } />
							</Button>
						</Tooltip>
					);
				} }
				isAppender
			/>
		);
	}

	// Selected Container.
	if ( isSelected ) {
		appender = <ButtonBlockAppender />;
	}

	// Empty non-selected Container.
	if ( ! hasChildBlocks && ! isSelected ) {
		appender = <Button
			className="th-container-selector"
			onClick={ () => selectBlock( clientId ) }
			aria-label={ __( 'Select Container', 'themehunk-block' ) }
		>
			<span className="th-container-selector__icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="th-block-icon"><path style={ { fill: 'none' } } d="M0 0h24v24H0z" /><path d="M21.375 22h-3.75v-1.25h3.125v-3.125H22v3.75c0 .345-.28.625-.625.625zM9.188 20.75h5.625V22H9.188zM6.375 22h-3.75A.625.625 0 0 1 2 21.375v-3.75h1.25v3.125h3.125V22zM2 9.187h1.25v5.625H2zm1.25-2.812H2v-3.75C2 2.28 2.28 2 2.625 2h3.75v1.25H3.25v3.125zM9.188 2h5.625v1.25H9.188zM22 6.375h-1.25V3.25h-3.125V2h3.75c.345 0 .625.28.625.625v3.75zm-1.25 2.812H22v5.625h-1.25z" /></svg>
			</span>
		</Button>;
	}

	return applyFilters(
		'themehunkblocks.editor.containerAppender',
		 appender,
		{ clientId, isSelected, attributes }
	);
};

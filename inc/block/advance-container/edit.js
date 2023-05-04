/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import { InnerBlocks,useBlockProps, useInnerBlocksProps , store as blockEditorStore} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import InsSettings from './settings.js';
import BlockAppender from './BlockAppender';
import './editor.scss';

export default function Edit({ attributes, setAttributes , clientId, useInnerContainer, isSelected}) {

			const { id } = attributes;

			if ( ! id ) {
			setAttributes( { id: clientId } );
			}
			
			const blockProps = useBlockProps({
				id: attributes.id
			});

			const innerBlocksProps = useInnerBlocksProps(
				! useInnerContainer
					? blockProps
					: { className: 'th-inside-container' },
					{
						templateLock: false,
						renderAppender: () => (
						<BlockAppender clientId={ attributes.id } isSelected={ isSelected } attributes={ attributes } />
						)
					}
			);

			const Tag = attributes.containerHTMLTag;
			//const containerBlockProps = useInnerContainer ? blockProps : innerBlocksProps;

			return (
				<Fragment>
				<InsSettings
				attributes={ attributes }
				setAttributes={ setAttributes }
			    />
				     <Tag >
					<InnerBlocks {...innerBlocksProps}/>
					</Tag>
				</Fragment>			
	        );

}
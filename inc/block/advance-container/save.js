/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

const Save = ({
	attributes
}) => {
	const Tag = attributes.columnsHTMLTag;
	
    //console.log(attributes);
	return (
		<Tag>
			<InnerBlocks.Content />
		</Tag>
	);
};

export default Save;

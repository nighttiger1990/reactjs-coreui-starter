import React from 'react'
import { Modifier, EditorState } from 'draft-js'
class HtmlToolbar extends React.Component {

    addStar = () => {
        const { editorState, onChange } = this.props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            '⭐',
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };

    render() {
        return (
            <div onClick={this.props.onClick} className="rdw-option-wrapper"><span className="fa fa-code"></span></div>
        );
    }
}
export default HtmlToolbar
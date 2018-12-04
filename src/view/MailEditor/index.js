import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Button } from 'reactstrap'
class MailEditor extends Component {
    constructor(props) {
        super(props)
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    onEditorStateChange = (e) => {
        console.log("===On Editor State Change: ", e)
        this.setState({
            editorState: e
        })
    }

    render() {
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Tạo chiến dịch gửi mail</h1>
                <Editor
                    editorStyle={{ border: "1px solid #F1F1F1", height: 400, padding: 10 }}
                    wrapperStyle={{ border: "1px solid #F1F1F1" }}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    onContentStateChange={this.onContentStateChange}
                    onEditorStateChange={this.onEditorStateChange} />
                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
                    style={{ width: "100%" }}
                />
                <Button children="Send email" />
            </div>
        );
    }
}

export default MailEditor;

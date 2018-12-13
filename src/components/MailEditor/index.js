import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { Input } from 'reactstrap'
import HtmlToolbar from '../HtmlToolbar';
class MailEditor extends Component {
    constructor(props) {
        super(props)
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentState = stateFromHTML(html);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState,
            htmlState: html,
            isHtmlMode: false
        };
    }

    onEditorStateChange = (e) => {
        // console.log("===On Editor State Change: ", e)
        this.setState({
            editorState: e
        })
    }
    onHtmlStateChange = (e) => {
        this.setState({
            htmlState: e.target.value
        })
    }

    onEditorToggle = () => {
        let newState = {
            isHtmlMode: !this.state.isHtmlMode
        }
        if (this.state.isHtmlMode) {
            newState.editorState = EditorState.createWithContent(stateFromHTML(this.state.htmlState))
        } else {
            newState.htmlState = stateToHTML(this.state.editorState.getCurrentContent())
        }
        console.log(newState)
        this.setState(newState)
    }

    render() {
        return (
            <div >
                <Editor
                    editorStyle={{ border: "1px solid #F1F1F1", height: 400, padding: 10 }}
                    wrapperStyle={{ border: "1px solid #F1F1F1" }}
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarCustomButtons={[<HtmlToolbar onClick={this.onEditorToggle} />]}
                    editorClassName={this.state.isHtmlMode ? "d-none" : ""}
                />
                <div className={`rdw-editor-wrapper ${this.state.isHtmlMode ? "" : "d-none"}`}>
                    <Input type="textarea"
                        value={this.state.htmlState}
                        style={{ border: "1px solid #F1F1F1", height: 400, padding: 10 }}
                        onChange={this.onHtmlStateChange}
                        className="rdw-editor-main"
                    />
                </div>
            </div>
        );
    }
}



export default MailEditor

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Button, FormGroup, Label, Input, Col } from 'reactstrap'
import { connect } from 'react-redux'
import RA from '../../redux/actions';
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

    onSendEmail = () => {
        console.log(this.props)
        this.props.dispatch(RA.checkAuth({ username: "username" }))
    }

    render() {
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Tạo chiến dịch gửi mail</h1>
                <FormGroup row>
                    <Label children="From" sm={2} />
                    <Col sm={10}>
                        <Input />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="To" sm={2} />
                    <Col sm={10}>
                        <Input />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Content" sm={2} />
                    <Col sm={10}>
                        <Editor
                            editorStyle={{ border: "1px solid #F1F1F1", height: 400, padding: 10 }}
                            wrapperStyle={{ border: "1px solid #F1F1F1" }}
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            onContentStateChange={this.onContentStateChange}
                            onEditorStateChange={this.onEditorStateChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="To" sm={2} />
                    <Col sm={10}>
                        <Button children="Send email" onClick={this.onSendEmail} />
                    </Col>
                </FormGroup>
                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
                    style={{ width: "100%" }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let auth = state.auth || {}
    return { auth }
}

export default connect(mapStateToProps)(MailEditor)

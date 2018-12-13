import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { Button, FormGroup, Label, Input, Col } from 'reactstrap'
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import MailEditor2 from '../../components/MailEditor2'
import Select from 'react-select'
// import RA from '../../redux/actions';

const options = [
    { value: 'nottemplate', label: 'Tự soạn thảo' },
    { value: 'template', label: 'Chọn từ mẫu' },
];

class MailSender extends Component {
    constructor(props) {
        super(props)
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentState = stateFromHTML(html);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState,
            htmlState: html,
            contentType: options[0]
        };
    }

    onEditorStateChange = (e) => {
        // console.log("===On Editor State Change: ", e)
        this.setState({
            editorState: e,
            htmlState: stateToHTML(e.getCurrentContent())
        })
    }
    onHtmlStateChange = (e) => {
        console.log("on Html change")
        let contentState = stateFromHTML(e.target.value)
        this.setState({
            editorState: EditorState.createWithContent(contentState),
            htmlState: e.target.value
        })
    }
    onSendEmail = () => {
        console.log(this.props)
        this.props.dispatch(RA.sendMail({ from: "truongbl@gmail.com", to: "truongbl@topica.edu.vn" }, (res) => {
            if (res.hasError) {
                console.log("send mail lỗi")
            } else {
                console.log("send mail thành công")
            }
        }))
    }

    onContentTypeChange = e => {
        console.log(e)
        this.setState({
            contentType: e
        })
    }
    render() {
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Gửi mail theo chiến dịch</h1>
                <FormGroup row>
                    <Label children="Email gửi" md={2} for="fromEmail"/>
                    <Col md={10} sm={12}>
                        <Input disabled={true} placeholder="Email gửi" id="fromEmail"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Email gửi" sm={2} for="aliasEmail"/>
                    <Col md={10} sm={12}>
                        <Input placeholder="Tên hiển thị" id="aliasEmail"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Chiến dịch" sm={2} for="idCampaign"/>
                    <Col md={5} sm={12}>
                        <Select id="idCampaign" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Đối tượng nhận" sm={2} />
                    <Col md={5} sm={12}>
                        <Select />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col md={10} sm={12}>
                        <Button children="Gửi mail" onClick={this.onSendEmail} />
                    </Col>
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let auth = state.auth || {}
    return { auth }
}

export default connect(mapStateToProps)(MailSender)

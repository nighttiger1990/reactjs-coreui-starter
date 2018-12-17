import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { Button, FormGroup, Label, Input, Col } from 'reactstrap'
import { connect } from 'react-redux'
// import RA from '../../redux/actions';
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import MailEditor2 from '../../components/MailEditor2'
import Axios from 'axios';
// import RA from '../../redux/actions';
class MailTemplate extends Component {
    constructor(props) {
        super(props)
        // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        // const contentState = stateFromHTML(html);
        // const editorState = EditorState.createWithContent(contentState);
        this.state = {
            // editorState,
            // htmlState: html
            from: "truongbl@topica.edu.vn",
            to: "truongbl@topica.edu.vn",
            subject: "[TruongBL] Mail service",
            content: "",
            files: []
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
    onSendEmail = async () => {
        // console.log(this.props)
        // this.props.dispatch(RA.sendMail({ from: "truongbl@gmail.com", to: "truongbl@topica.edu.vn" }, (res) => {
        //     if (res.hasError) {
        //         console.log("send mail lỗi")
        //     } else {
        //         console.log("send mail thành công")
        //     }
        // }))
        let url = "http://10.0.18.183:8021/api/sendemail/sendemail"
        let contentMail = await this.mailEditor.exportHtml()
        let formData = new FormData()
        formData.append("fromEmail", this.state.from)
        formData.append("toEmail", this.state.to)
        formData.append("subject", this.state.subject)
        formData.append("content", contentMail)
        // formData.append("files", this.state.files)


        Axios.post(url, formData)
        .then(res=>{
            console.log("Gửi mail thành công", res)

        })
        .catch(err=>{
            console.log("Có lỗi trong quá trình gửi mail")
        })
    }

    onFromChange = (e) => {
        this.setState({
            from: e.target.value
        })
    }

    onToChange = (e) => {
        this.setState({
            to: e.target.value
        })
    }

    render() {
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Tạo mẫu mail</h1>
                <FormGroup row>
                    <Label children="From" sm={2} />
                    <Col sm={10}>
                        <Input onChange={this.onFromChange} value={this.state.from}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="To" sm={2} />
                    <Col sm={10}>
                        <Input onChange={this.onToChange} value={this.state.to}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <MailEditor2 ref={ref=>this.mailEditor = ref}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Đính kèm" sm={2} for="file" />
                    <Col sm={10}>
                        <Input name="file" id="file" type="file" multiple={true} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col sm={10}>
                        <Button children="Send mail" onClick={this.onSendEmail} />
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

export default connect(mapStateToProps)(MailTemplate)

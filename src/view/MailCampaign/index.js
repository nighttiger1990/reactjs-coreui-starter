import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { Button, FormGroup, Label, Input, Col } from 'reactstrap'
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import Select from 'react-select'
import MailEditor2 from '../../components/MailEditor2';
// import RA from '../../redux/actions';

const options = [
    { value: 'template', label: 'Chọn từ mẫu' },
    { value: 'nottemplate', label: 'Tự soạn thảo' },
];

class MailCampaign extends Component {
    constructor(props) {
        super(props)
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentState = stateFromHTML(html);
        const editorState = EditorState.createWithContent(contentState);
        const listMailTemplate = []
        this.state = {
            editorState,
            htmlState: html,
            contentType: options[0],
            listMailTemplate: listMailTemplate
            
        };
    }

    onEditorStateChange = (e) => {
        console.log("===On Editor State Change: ", e)
        this.setState({
            editorState: e
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
        const listMailTemplate = this.state.listMailTemplate || []
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Tạo chiến dịch gửi mail</h1>
                <FormGroup row>
                    <Label children="Tên chiến dịch" sm={2} for="campaignName"/>
                    <Col sm={10}>
                        <Input placeholder={"Tên chiến dịch nên để theo mẫu [Sản phẩm - Team - Tiêu đề]"} id="campaignName"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Miêu tả chiến dịch" sm={2} for="campaignDescription"/>
                    <Col sm={10}>
                        <Input type="textarea" placeholder="Miêu tả chiến dịch của bạn" id="campaignDescription"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Trạng thái" sm={2} for="status"/>
                    <Col sm={10}>
                        <Input id="status"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Tiêu đề mail" sm={2} for="subjectMail"/>
                    <Col sm={10}>
                        <Input id="subjectMail" placeholder="Tiêu đề email của bạn"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} children="Loại nội dung" />
                    <Col sm={4}>
                        <Select options={options} value={this.state.contentType} onChange={this.onContentTypeChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col sm={10}>
                        {
                            this.state.contentType == options[1]
                                ? <MailEditor2 />
                                : <Select options={listMailTemplate}/>
                        }

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Attachment" sm={2} for="file" />
                    <Col sm={10}>
                        <Input name="file" id="file" type="file" multiple={true} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col sm={10}>
                        <Button children="Tạo chiến dịch" onClick={this.onSendEmail} />
                    </Col>
                </FormGroup>
                {/* <textarea
                    disabled
                    value={stateToHTML(this.state.editorState.getCurrentContent())}
                    style={{ width: "100%" }}
                /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let auth = state.auth || {}
    return { auth }
}

export default connect(mapStateToProps)(MailCampaign)

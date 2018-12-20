import React, { Component } from 'react';
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import { stateFromHTML } from 'draft-js-import-html'
// import { stateToHTML } from 'draft-js-export-html'
import { Button, FormGroup, Label, Input, Col } from 'reactstrap'
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import Select from 'react-select'
import MailEditor2 from '../../components/MailEditor2';
import MailEditor from 'react-email-editor'
// import RA from '../../redux/actions';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const options = [
    { value: 'template', label: 'Chọn từ mẫu' },
    { value: 'nottemplate', label: 'Tự soạn thảo' },
    // { value: 'nottemplate2', label: 'Tự soạn thảo 2' },
];

class CampaignCreate extends Component {
    constructor(props) {
        super(props)
        const listMailTemplate = []
        this.state = {
            contentType: options[0],
            listMailTemplate: listMailTemplate,
            Name: "",
            Description: "",
            SubjectMail: "",
            ContentMail: "",
            Files: []

        };
    }

    onCreateCampaign = () => {
        console.log(this.props)
        let formData = new FormData()
        formData.append("Name", this.state.Name)
        formData.append("Description", this.state.Description)
        formData.append("SubjectMail", this.state.SubjectMail)
        formData.append("ContentMail", this.state.ContentMail)
        formData.append("files", this.state.Files)
        this.props.dispatch(RA.cCampaign(formData, this.onCreateCallback))
    }
    onCreateCallback = e => {
        console.log("create campaign callback", e)
    }

    onContentTypeChange = e => {
        console.log(e)
        this.setState({
            contentType: e
        })
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        const listMailTemplate = this.state.listMailTemplate || []
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Tạo chiến dịch gửi mail</h1>
                <FormGroup row>
                    <Label children="Tên chiến dịch" sm={2} for="Name" />
                    <Col sm={10}>
                        <Input placeholder={"Tên chiến dịch nên để theo mẫu [Sản phẩm - Team - Tiêu đề]"} id="Name" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Miêu tả chiến dịch" sm={2} for="Description" />
                    <Col sm={10}>
                        <Input type="textarea" placeholder="Miêu tả chiến dịch của bạn" id="Description" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                {/* <FormGroup row>
                    <Label children="Trạng thái" sm={2} for="status" />
                    <Col sm={10}>
                        <Input id="status" />
                    </Col>
                </FormGroup> */}
                <FormGroup row>
                    <Label children="Tiêu đề mail" sm={2} for="SubjectMail" />
                    <Col sm={10}>
                        <Input id="SubjectMail" placeholder="Tiêu đề email của bạn" onChange={this.onChange} />
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
                            this.state.contentType == options[0] && <Select />
                        }
                        {
                            //eslint-disable-next-line
                            this.state.contentType == options[1] && <MailEditor />
                        }
                        {/* {
                            this.state.contentType == options[2] &&
                            <CKEditor
                                editor={ClassicEditor}
                                data="<p>Hello from CKEditor 5!</p>"
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                    editor.ui.view.editable.element.parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.view.editable.element
                                    );
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                }}
                                onBlur={editor => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={editor => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        } */}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Attachment" sm={2} for="Files" />
                    <Col sm={10}>
                        <Input name="Files" id="file" type="file" multiple={true} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col sm={10}>
                        <Button children="Tạo chiến dịch" onClick={this.onCreateCampaign} color="primary" />
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

export default connect(mapStateToProps)(CampaignCreate)

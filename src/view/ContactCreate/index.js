import React from 'react'
import { FormGroup, Label, Input, Col, Button } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
const optionsGender = [
    { value: 1, label: 'Nam' },
    { value: 0, label: 'Nữ' },
];
class ContactCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render = () => {
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Gửi mail theo chiến dịch</h1>
                <FormGroup row>
                    <Label children="Họ và tên" md={2} for="fullName" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Họ và tên" id="fullName" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Email" md={2} for="email" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Email" id="email" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Ngày sinh" md={2} for="birthday" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Ngày sinh" id="birthday" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Địa chỉ" md={2} for="address" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Địa chỉ" id="address" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Quốc gia" md={2} for="national" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Quốc gia" id="national" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Giới tính" sm={2} for="gender" />
                    <Col md={10} sm={12}>
                        <Select id="idCampaign" options={optionsGender} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col md={10} sm={12}>
                        <Button children="Tạo contact" onClick={this.onSendEmail} />
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.contact }
}

export default connect(mapStateToProps)(ContactCreate)
import React from 'react'
import { FormGroup, Label, Input, Col, Button, Alert } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import RA from '../../redux/actions';
const optionsGender = [
    { value: 1, label: 'Nam' },
    { value: 0, label: 'Nữ' },
];
class ContactCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            email: "",
            gender: 1,
            birthday: "",
            phoneNumber: "",
            address: "",
            national: "",
            error: null
        }
    }

    onContactCreate = () => {
        let data = { ...this.state }
        console.log(data)
        this.props.dispatch(RA.cContact(data, this.onCreateCallback))
    }

    onCreateCallback = (e) => {
        console.log("onCreateCallback", e)
        if (e.hasError) {
            console.log(e)
            let message = typeof e == "string" ? e : (e.payload.message || "Có lỗi xảy ra trong quá trình thêm mới thông tin contact")
            this.setState({
                error: message
            })
        } else {
            this.props.history.push('/contactlist')
        }

    }
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onGenderChange = (e, a, b) => {
        this.setState({
            gender: e.value
        })
    }
    render = () => {
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Thêm mới thông tin contact</h1>
                <FormGroup row>
                    <Label children="Họ và tên" md={2} for="fullName" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Họ và tên" id="fullName" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Phone" md={2} for="phoneNumber" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Phone number" id="phoneNumber" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Email" md={2} for="email" />
                    <Col md={10} sm={12}>
                        <Input type="email" placeholder="Email" id="email" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Ngày sinh" md={2} for="birthday" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Ngày sinh" id="birthday" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Địa chỉ" md={2} for="address" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Địa chỉ" id="address" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Quốc gia" md={2} for="national" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Quốc gia" id="national" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Giới tính" sm={2} for="gender" />
                    <Col md={10} sm={12}>
                        <Select id="gender" options={optionsGender} onChange={this.onGenderChange} isSearchable={false} defaultValue={optionsGender[0]} />
                    </Col>
                </FormGroup>
                {
                    this.state.error
                        ? <FormGroup row>
                            <Label children="" sm={2} />
                            <Col md={10} sm={12}>
                                <Alert color="danger" children={this.state.error}/>
                            </Col>
                        </FormGroup>
                        : null
                }
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col md={10} sm={12}>
                        <Button children="Tạo contact" onClick={this.onContactCreate} color="primary"/>
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
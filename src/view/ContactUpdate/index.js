import React from 'react'
import { FormGroup, Label, Input, Col, Button, Alert } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import RA from '../../redux/actions';
const optionsGender = [
    { value: 1, label: 'Nam' },
    { value: 0, label: 'Nữ' },
];
class ContactUpdate extends React.Component {
    constructor(props) {
        super(props)
        console.log("Khởi tại nè", this.props)
        let newState = {...this.props.location.state}
        this.state = newState
    }

    onContactUpdate = () => {
        let data = { ...this.state }
        console.log(data)
        this.props.dispatch(RA.uContact(data, this.onUpdateCallback))
    }

    onUpdateCallback = (e) => {
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
                <h1 className="text-center">Gửi mail theo chiến dịch</h1>
                <FormGroup row>
                    <Label children="Họ và tên" md={2} for="FullName" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Họ và tên" id="FullName" onChange={this.onChange} value={this.state.FullName}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Phone" md={2} for="PhoneNumber" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Phone number" id="PhoneNumber" onChange={this.onChange} value={this.state.PhoneNumber}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Email" md={2} for="Email" />
                    <Col md={10} sm={12}>
                        <Input type="email" placeholder="Email" id="Email" onChange={this.onChange} value={this.state.Email}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Ngày sinh" md={2} for="Birthday" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Ngày sinh" id="Birthday" onChange={this.onChange} value={this.state.Birthday}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Địa chỉ" md={2} for="Address" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Địa chỉ" id="Address" onChange={this.onChange} value={this.state.Address}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Quốc gia" md={2} for="National" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Quốc gia" id="National" onChange={this.onChange} value={this.state.National}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Giới tính" sm={2} for="Gender" />
                    <Col md={10} sm={12}>
                        <Select id="Gender" options={optionsGender} onChange={this.onGenderChange} isSearchable={false} defaultValue={optionsGender[0]} />
                    </Col>
                </FormGroup>
                {
                    this.state.error
                        ? <FormGroup row>
                            <Label children="" sm={2} />
                            <Col md={10} sm={12}>
                                <Alert color="danger" children={this.state.error} />
                            </Col>
                        </FormGroup>
                        : null
                }
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col md={10} sm={12}>
                        <Button onClick={this.onContactUpdate} color="primary">
                            <span className={`fa ${this.props.contacts && this.props.contacts.isLoading? "fa-spinner fa-spin" : "fa-save"}`}></span> Update contact
                        </Button>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.contact }
}

export default connect(mapStateToProps)(ContactUpdate)
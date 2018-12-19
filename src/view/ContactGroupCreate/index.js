import React from 'react'
import { FormGroup, Label, Input, Col, Button } from 'reactstrap'
import Select from 'react-select'
import { connect } from 'react-redux'
import RA from '../../redux/actions';

class ContactGroupCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            GroupDetail: []
        }
    }

    onSelectContact = (e) => {
        this.setState({
            GroupDetail: e
        })
    }

    onCreateGroup = () => {
        let data = {
            Group: {
                Name: this.state.Name
            },
            GroupDetail: this.state.GroupDetail.map(item => { return { ...item, ContactsId: item.Id } })
        }
        this.props.dispatch(RA.cContactGroup(data, this.onCreateGroupCallback))
    }
    onCreateGroupCallback = e => {
        console.log(e)
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render = () => {
        console.log("this.props", this.props)
        let contacts = this.props.contacts
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Thêm mới thông tin nhóm contact</h1>
                <FormGroup row>
                    <Label children="Tên nhóm" md={2} for="Name" />
                    <Col md={10} sm={12}>
                        <Input placeholder="Tên nhóm contact" id="Name" onChange={this.onChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="Giới tính" sm={2} for="gender" />
                    <Col md={10} sm={12}>
                        <Select id="idCampaign" options={contacts} isMulti={true}
                            getOptionLabel={(item) => item.FullName}
                            getOptionValue={(item) => item.Id}
                            closeMenuOnSelect={false}
                            onChange={this.onSelectContact}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label children="" sm={2} />
                    <Col md={10} sm={12}>
                        <Button children="Tạo contact group" onClick={this.onCreateGroup} color="primary" />
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let contacts = state.contact && state.contact.contacts && state.contact.contacts.Data ? state.contact.contacts.Data : [];
    return { contacts }
}

export default connect(mapStateToProps)(ContactGroupCreate)
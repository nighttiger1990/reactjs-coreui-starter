import React from 'react'
import { FormGroup, Label, Input, Col, Button, Table } from 'reactstrap'
import Select from 'react-select'
import BTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import moment from 'moment'

const sttFormatter = (cell, row, idx) => {
    return <div style={{ textAlign: 'center' }}>{idx + 1}</div>
}
const genderFormatter = (cell, row, idx) => {
    return cell ? <span>{cell ? "Nam" : "Nữ"}</span> : null
}
const birthdayFormatter = (cell, row) => {
    return cell ? <span>{moment(cell).format("L")}</span> : null
}

const columns = [

    { dataField: 'stt', text: '', headerAlign: 'center', headerStyle: { width: 60 }, formatter: sttFormatter },
    { dataField: 'id', text: 'User ID', sort: true, headerAlign: 'center', headerStyle: { width: 80 }, hidden: true },
    { dataField: 'fullName', text: 'Fullname', headerAlign: 'center', headerStyle: { width: 250 } },
    { dataField: 'email', text: 'Email', headerAlign: 'center', headerStyle: { width: 250 } },
    { dataField: 'gender', text: 'Giới tính', headerAlign: 'center', headerStyle: { width: 120 }, formatter: genderFormatter, sort: true },
    { dataField: 'birthday', text: 'Ngày sinh', headerAlign: 'center', headerStyle: { width: 120 }, formatter: birthdayFormatter },
    { dataField: 'phoneNumber', text: 'Điện thoại', headerAlign: 'center' },
    { dataField: 'address', text: 'Địa chỉ', headerAlign: 'center' },
    { dataField: 'national', text: 'Quốc gia', headerAlign: 'center' },
    // { dataField: 'createDate', text: 'Ngày tạo', },
    // { dataField: 'createBy', text: 'Tạo bởi', },
    // { dataField: 'changeDate', text: 'Ngày sửa cuối', },
    // { dataField: 'changeBy', text: 'Sửa cuối bởi', },
];

const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
}];


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
    </span>
);

const pageOptions = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: true, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
        { text: '5', value: 5 },
        { text: '10', value: 10 }
    ] // A numeric array is also available. the purpose of above example is custom the text
};

class ContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageindex: 1,
            pagesize: 50
        }
    }

    add = () => {
        console.log(this)
        this.props.history.push('/contactcreate')
    }
    edit = () => {
        console.log(this)
        this.props.history.push('/contactupdate')
    }
    remove = () => {
        console.log(this)
    }
    actionFormatter = (cell, row) => {
        return (
            <div>
                <Button title="Add" color="primary" className="ml-1" size="sm" onClick={this.add}><span className="fa fa-adn"></span></Button>
                <Button title="Edit" color="primary" className="ml-1" size="sm" onClick={this.edit}><span className="fa fa-edit"></span></Button>
                <Button title="Remove" color="danger" className="ml-1" size="sm" onClick={this.remove}><span className="fa fa-trash"></span></Button>
            </div>
        )
    }
    componentDidMount = () => {
        this.props.dispatch(RA.fetchContact({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
    }
    render = () => {
        const contacts = this.props.contacts
        const tableColumns = [...columns]
        tableColumns.push({ dataField: 'action', text: 'Action', headerAlign: 'center', headerStyle: { width: 120 }, formatter: this.actionFormatter })
        return (
            <div style={{ margin: 5 }}>
                <h1 className="text-center">Danh sách Contact</h1>
                <BTable
                    bootstrap4
                    keyField="id"
                    data={contacts}
                    columns={tableColumns}
                    defaultSorted={defaultSorted}
                    // selectRow={{ mode: 'checkbox', clickToSelect: true }}
                    defaultSortDirection="asc"
                    striped={true}
                    hover={true}
                    condensed={true}
                    noDataIndication="Table is Empty"
                // pagination={paginationFactory(pageOptions)}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.contact }
}

export default connect(mapStateToProps)(ContactList)
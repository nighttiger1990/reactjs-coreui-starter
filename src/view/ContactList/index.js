import React from 'react'
//eslint-disable-next-line
import { FormGroup, Label, Input, Col, Button, Table, Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import moment from 'moment'
import XPagination from '../../components/XPagination';

const sttFormatter = (cell, row, idx) => {
    return <div style={{ textAlign: 'center' }}>{idx + 1}</div>
}
const genderFormatter = (cell, row, idx) => {
    return cell != null ? <span>{cell ? "Nam" : "Nữ"}</span> : null
}
const birthdayFormatter = (cell, row) => {
    return cell ? <span>{moment(cell).format("L")}</span> : null
}

const columns = [

    { dataField: 'stt', text: '', headerAlign: 'center', headerStyle: { width: 60 }, formatter: sttFormatter },
    { dataField: 'Id', text: 'User ID', sort: true, headerAlign: 'center', headerStyle: { width: 80 }, hidden: true },
    { dataField: 'FullName', text: 'Fullname', headerAlign: 'center', headerStyle: { width: 250 } },
    { dataField: 'Email', text: 'Email', headerAlign: 'center', headerStyle: { width: 250 } },
    { dataField: 'Gender', text: 'Giới tính', headerAlign: 'center', headerStyle: { width: 120 }, formatter: genderFormatter, sort: true },
    { dataField: 'Birthday', text: 'Ngày sinh', headerAlign: 'center', headerStyle: { width: 120 }, formatter: birthdayFormatter },
    { dataField: 'PhoneNumber', text: 'Điện thoại', headerAlign: 'center' },
    { dataField: 'Address', text: 'Địa chỉ', headerAlign: 'center' },
    { dataField: 'National', text: 'Quốc gia', headerAlign: 'center' },
    // { dataField: 'createDate', text: 'Ngày tạo', },
    // { dataField: 'createBy', text: 'Tạo bởi', },
    // { dataField: 'changeDate', text: 'Ngày sửa cuối', },
    // { dataField: 'changeBy', text: 'Sửa cuối bởi', },
];


const defaultSorted = [{
    dataField: 'Id',
    order: 'asc'
}];

// const customTotal = (from, to, size) => (
//     <span className="react-bootstrap-table-pagination-total">
//         Showing {from} to {to} of {size} Results
//     </span>
// );
// const pageOptions = {
//     paginationSize: 1,
//     pageStartIndex: 1,
//     alwaysShowAllBtns: true, // Always show next and previous button
//     withFirstAndLast: true, // Hide the going to First and Last page button
//     // hideSizePerPage: true, // Hide the sizePerPage dropdown always
//     // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
//     firstPageText: '<<',
//     prePageText: '<',
//     nextPageText: '>',
//     lastPageText: '>>',
//     nextPageTitle: 'First page',
//     prePageTitle: 'Pre page',
//     firstPageTitle: 'Next page',
//     lastPageTitle: 'Last page',
//     showTotal: true,
//     paginationTotalRenderer: customTotal,
//     sizePerPageList: [
//         { text: '1', value: 1 },
//         { text: '2', value: 2 }
//     ] // A numeric array is also available. the purpose of above example is custom the text
// };

class ContactList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageindex: 1,
            totalPage: 20,
            pagesize: 5,
            selectedRow: null,
            isShowDelete: false,
            importFiles: null
        }
    }

    add = () => {
        this.props.history.push('/contactcreate')
    }
    edit = (data) => {
        this.props.history.push('/contactupdate', data)
    }
    remove = (row) => {
        this.setState({
            isShowDelete: !this.state.isShowDelete,
            selectedRow: row
        })
    }
    actionFormatter = (cell, row) => {
        return (
            <div>
                <Button title="Add" color="primary" className="ml-1" size="sm" onClick={this.add}><span className="fa fa-adn"></span></Button>
                <Button title="Edit" color="primary" className="ml-1" size="sm" onClick={() => this.edit(row)}><span className="fa fa-edit"></span></Button>
                <Button title="Remove" color="danger" className="ml-1" size="sm" onClick={() => this.remove(row)}><span className="fa fa-trash"></span></Button>
            </div>
        )
    }

    toggleModal = () => {
        this.setState({
            isShowDelete: !this.state.isShowDelete
        })
    }
    onContactDelete = () => {
        let data = this.state.selectedRow
        this.props.dispatch(RA.dContact(data, (e) => {
            console.log("onContactDelete Callback", e)
        }))
    }
    onImportFileChange = (e) => {
        this.setState({
            importFiles: e.target.value
        })
    }
    onPageChange = page => {
        console.log(page)
        this.setState({
            pageindex: page
        }, () => {
            this.props.dispatch(RA.fetchContact({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
        })
    }
    componentDidMount = () => {
        this.props.dispatch(RA.fetchContact({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
    }

    componentWillReceiveProps = (nextProps, nextContext) => {
        if (nextProps.contacts) {
            // let totalPage = ((nextProps.contacts.totalRecords || 0) / this.state.pagesize) + 1
            let totalPage = Math.floor((nextProps.contacts.TotalRecords || 0) / this.state.pagesize) + (nextProps.contacts.TotalRecords % this.state.pagesize === 0 ? 0 : 1)
            this.setState({ totalPage: totalPage })
        }
    }
    render = () => {
        const contacts = this.props.contacts && this.props.contacts.Data ? this.props.contacts.Data : []
        console.log("==============>", contacts)
        const tableColumns = [...columns]
        tableColumns.push({ dataField: 'action', text: 'Action', headerAlign: 'center', headerStyle: { width: 120 }, formatter: this.actionFormatter })
        return (
            <div style={{ margin: 5 }}>
                <Modal isOpen={this.state.isShowDelete} centered={true} toggle={this.toggleModal}>
                    <ModalHeader children={"Thông báo"} />
                    <ModalBody>
                        <div>{"Bạn có chắc chắn muốn xóa contact này không?\n"}</div>
                        <div className="alert-danger">{"\n Không"}</div>
                    </ModalBody>
                    <ModalFooter >
                        <Button title={"Xóa"} children={"Xóa"} color="primary" onClick={this.onContactDelete} />
                        <Button title={"Hủy"} children={"Hủy"} color="primary" onClick={this.toggleModal} />
                    </ModalFooter>
                </Modal>
                <h1 className="text-center">Danh sách Contact</h1>
                {/* <FormGroup row>
                    <Col sm="4">
                        <Input type="file" onChange={this.onImportFileChange} />
                    </Col>
                    <Col sm="2">
                        <Button title="Import contacts" children="Import contacts" color="primary" onClick={() => { }} />
                    </Col>
                </FormGroup> */}
                <BTable
                    bootstrap4
                    keyField="Id"
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
                <XPagination currentPage={this.state.pageindex} totalPage={this.state.totalPage} onPageChange={this.onPageChange} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.contact }
}

export default connect(mapStateToProps)(ContactList)




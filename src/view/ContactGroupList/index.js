import React from 'react'
//eslint-disable-next-line
import { FormGroup, Label, Input, Col, Button, Table, Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import XPagination from '../../components/XPagination';

const sttFormatter = (cell, row, idx) => {
    return <div style={{ textAlign: 'center' }}>{idx + 1}</div>
}

const columns = [

    { dataField: 'stt', text: '', headerAlign: 'center', headerStyle: { width: 60 }, formatter: sttFormatter },
    { dataField: 'Id', text: 'User ID', sort: true, headerAlign: 'center', headerStyle: { width: 80 }, hidden: true },
    { dataField: 'Name', text: 'Name', headerAlign: 'center' },
];

class ContactGroupList extends React.Component {
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
        this.props.history.push('/contactgroupcreate')
    }
    edit = (data) => {
        this.props.history.push('/contactgroupupdate', data)
    }
    remove = (row) => {
        this.setState({
            isShowDelete: !this.state.isShowDelete,
            selectedRow: row
        })
    }
    actionFormatter = (cell, row) => {
        return (
            <div className="text-center">
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
        this.props.dispatch(RA.dContactGroup(data, (e) => {
            console.log("onContactDelete Callback", e)
        }))
    }
    onImportFileChange = (e) => {
        this.setState({
            importFiles: e.target.value
        })
    }
    onPageChange = page => {
        this.setState({
            pageindex: page
        }, () => {
            this.props.dispatch(RA.fetchContactGroup({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
        })
    }
    componentDidMount = () => {
        this.props.dispatch(RA.fetchContactGroup({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
    }

    componentWillReceiveProps = (nextProps, nextContext) => {
        if (nextProps.contactGroupInfo) {
            // let totalPage = ((nextProps.contacts.totalRecords || 0) / this.state.pagesize) + 1
            let totalPage = Math.floor((nextProps.contactGroupInfo.TotalRecords || 0) / this.state.pagesize) + (nextProps.contactGroupInfo.TotalRecords % this.state.pagesize === 0 ? 0 : 1)
            this.setState({ totalPage: totalPage })
        }
    }
    render = () => {
        const contactGroups = this.props.contactGroupInfo && this.props.contactGroupInfo.Data ? this.props.contactGroupInfo.Data : []
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
                <h1 className="text-center">Danh sách nhóm Contact</h1>
                <FormGroup row>
                    <Button title="Add" color="primary" className="ml-1" size="sm" onClick={this.add}><span className="fa fa-adn"></span></Button>
                </FormGroup>
                <BTable
                    bootstrap4
                    keyField="Id"
                    data={contactGroups}
                    columns={tableColumns}
                    loading={true}
                    // selectRow={{ mode: 'checkbox', clickToSelect: true }}
                    defaultSortDirection="asc"
                    striped={true}
                    hover={true}
                    condensed={true}
                    noDataIndication="Không tìm thấy dữ liệu nào"
                // pagination={paginationFactory(pageOptions)}
                />
                {this.props.isLoading ? <span className="fa fa-spinner fa-spin" /> : null}
                <XPagination currentPage={this.state.pageindex} totalPage={this.state.totalPage} onPageChange={this.onPageChange} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.contactGroup }
}

export default connect(mapStateToProps)(ContactGroupList)




import React from 'react'
//eslint-disable-next-line
import { FormGroup, Label, Input, Col, Button, Table, Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux'
import RA from '../../redux/actions';
import moment from 'moment'
import XPagination from '../../components/XPagination';



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

class CampaignList extends React.Component {
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

    sttFormatter = (cell, row, idx) => {
        return <div style={{ textAlign: 'center' }}>{(this.state.pageindex - 1) * this.state.pagesize + idx + 1}</div>
    }
    genderFormatter = (cell, row, idx) => {
        return cell != null ? <span>{cell ? "Nam" : "Nữ"}</span> : null
    }
    birthdayFormatter = (cell, row) => {
        return cell ? <span>{moment(cell).format("L")}</span> : null
    }

    columns = [

        { dataField: 'stt', text: '', headerAlign: 'center', headerStyle: { width: 60 }, formatter: this.sttFormatter },
        { dataField: 'Id', text: 'User ID', sort: true, headerAlign: 'center', headerStyle: { width: 80 }, hidden: true },
        { dataField: 'Name', text: 'Tên chiến dịch', headerAlign: 'center', headerStyle: { width: "auto" } },
        { dataField: 'SubjectMail', text: 'Tên mail', headerAlign: 'center', headerStyle: { width: 250 } },
        { dataField: 'Description', text: 'Miêu tả', headerAlign: 'center', headerStyle: { width: 250 } },
    ];


    defaultSorted = [{
        dataField: 'Id',
        order: 'asc'
    }];

    add = () => {
        this.props.history.push('/campaigncreate')
    }
    edit = (data) => {
        this.props.history.push('/campaignupdate', data)
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
    onCampaignDelete = () => {
        let data = this.state.selectedRow
        this.props.dispatch(RA.dCampaign(data, (e) => {
            if (!e.hasError) {
                this.toggleModal()
                this.props.dispatch(RA.fetchCampaign({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
            } else {
                this.setState({
                    deleteError: typeof e
                })
            }
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
            this.props.dispatch(RA.fetchCampaign({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
        })
    }
    componentDidMount = () => {
        this.props.dispatch(RA.fetchCampaign({ pageindex: this.state.pageindex, pagesize: this.state.pagesize }))
    }

    componentWillReceiveProps = (nextProps, nextContext) => {
        if (nextProps.campaignInfo) {
            // let totalPage = ((nextProps.contacts.totalRecords || 0) / this.state.pagesize) + 1
            let totalPage = Math.floor((nextProps.campaignInfo.TotalRecords || 0) / this.state.pagesize) + (nextProps.campaignInfo.TotalRecords % this.state.pagesize === 0 ? 0 : 1)
            this.setState({ totalPage: totalPage })
        }
    }
    render = () => {
        const campaigns = this.props.campaignInfo && this.props.campaignInfo.Data ? this.props.campaignInfo.Data : []
        const tableColumns = [...this.columns]
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
                        <Button title={"Xóa"} children={"Xóa"} color="primary" onClick={this.onCampaignDelete} />
                        <Button title={"Hủy"} children={"Hủy"} color="primary" onClick={this.toggleModal} />
                    </ModalFooter>
                </Modal>
                <h1 className="text-center">Danh sách Campaign</h1>

                <FormGroup row>
                    <Button title="Add" color="primary" className="ml-1" size="sm" onClick={this.add}><span className="fa fa-adn"></span></Button>
                </FormGroup>
                <BTable
                    bootstrap4
                    keyField="Id"
                    data={campaigns}
                    columns={tableColumns}
                    loading={true}
                    defaultSorted={this.defaultSorted}
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
    return { ...state.campaign }
}

export default connect(mapStateToProps)(CampaignList)




import React from 'react'
import { Pagination, PaginationItem, PaginationLink, Input, Button, Label } from 'reactstrap'

class XPagination extends React.Component {
    constructor(props) {
        super(props)
        let currentPage = this.props.currentPage || 1
        let totalPage = this.props.totalPage || 1
        let gotoPage = this.props.currentPage || 1
        this.state = {
            currentPage: currentPage,
            totalPage: totalPage,
            gotoPage: gotoPage
        }
    }

    _onPageChange = (page) => {
        this.setState({
            currentPage: page
        }, () => {
            if (typeof this.props.onPageChange == "function") {
                this.props.onPageChange(page)
            }
        })
    }

    _renderPage = (currentPage) => {
        return (
            <PaginationItem active>
                <PaginationLink children={this.state.currentPage} />
            </PaginationItem>
        )
    }

    _onGotoPageChange = e => {
        this.setState({
            gotoPage: e.target.value
        })
    }
    componentWillReceiveProps = (nextProps, nextContext) => {
        this.setState({
            ...nextProps
        })
    }
    render = () => {
        const hasPrevious = this.state.currentPage > 1
        const hasNext = this.state.currentPage < this.state.totalPage
        const pageRender = this._renderPage(this.state.currentPage)
        return (
            <div>
                <Pagination style={{}}>
                    <PaginationItem disabled={!hasPrevious} >
                        <PaginationLink previous={true} onClick={() => { this._onPageChange(1) }} />
                    </PaginationItem>
                    <PaginationItem disabled={!hasPrevious} >
                        <PaginationLink children="‹" onClick={() => { this._onPageChange(this.state.currentPage - 1) }} />
                    </PaginationItem>
                    {pageRender}
                    <PaginationItem disabled={!hasNext} >
                        <PaginationLink children="›" onClick={() => { this._onPageChange(this.state.currentPage + 1) }} />
                    </PaginationItem>
                    <PaginationItem disabled={!hasNext} >
                        <PaginationLink next={true} onClick={() => { this._onPageChange(this.state.totalPage) }} />
                    </PaginationItem>
                    <Label className="page-link" style={{ borderWidth: 0, marginLeft: 0, color: 'inherit' }} children="Go to:" />
                    <Input type="number" min={1} max={this.state.totalPage} style={{ width: "auto", marginLeft: 2 }} value={this.state.gotoPage} onChange={this._onGotoPageChange} />
                    <Label className="page-link" style={{ borderWidth: 0, marginLeft: 3, color: 'inherit' }} children={`/ ${this.state.totalPage}`} />
                    <PaginationItem style={{marginLeft: 3}}>
                        <Button color="primary" title="Go" children="Go" size="md" onClick={() => {this._onPageChange(this.state.gotoPage)}}/>
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}

export default XPagination
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable, usePagination } from 'react-table'
import { Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner } from "reactstrap";
import ReactPaginate from 'react-paginate';

const ReactTable = ({
    columns,
    data,
    sizePerPage,
    setSizePerPage,
    loading,
    setCurrentPage,
    pageCount: controlledPageCount
}) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        headerGroups,
        prepareRow,
        pageOptions,
        setPageSize,
        state: { pageSize },
        rows
    } = useTable({
        columns,
        data,
        manualPagination: true, // Tell the usePagination
        // hook that we'll handle our own data fetching
        // This means we'll also have to provide our own
        // pageCount.
        pageCount: controlledPageCount,
    }, usePagination)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
    };

    useEffect(() => {
        if (pageSize != sizePerPage) {
            setSizePerPage(pageSize)
        }
    }, [pageSize])

    // Render the UI for your table
    return (
        <>
            <Table striped bordered hover {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className='text-center'>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {!loading ? rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td className='text-center align-middle' {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    }) :
                        <tr className='text-center'>
                            <td colSpan={columns.length}>
                                <Spinner
                                    color="dark"
                                    type="grow"
                                    className='me-2'
                                >
                                    Loading...
                                </Spinner>
                                <Spinner
                                    color="dark"
                                    type="grow"
                                    className='me-2'
                                >
                                    Loading...
                                </Spinner>
                                <Spinner
                                    color="dark"
                                    type="grow"
                                    className='me-2'
                                >
                                    Loading...
                                </Spinner>
                                <Spinner
                                    color="dark"
                                    type="grow"
                                    className='me-2'
                                >
                                    Loading...
                                </Spinner>
                            </td>
                        </tr>
                    }
                    {rows.length == 0 && !loading && <tr className='text-center'>
                        <td colSpan={columns.length}>
                            No data
                        </td>
                    </tr>}
                </tbody>
            </Table>
            <div className='d-flex justify-content-between'>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>{pageSize}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setPageSize(10)}>10</DropdownItem>
                        <DropdownItem onClick={() => setPageSize(25)}>25</DropdownItem>
                        <DropdownItem onClick={() => setPageSize(30)}>30</DropdownItem>
                        <DropdownItem onClick={() => setPageSize(50)}>50</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <ReactPaginate
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    breakLabel="..."
                    nextLabel="next >"
                    previousLabel="< previous"
                    containerClassName="pagination justify-content-center"
                    hrefBuilder={(page, pageCount, selected) =>
                        page >= 1 && page <= pageCount ? `/page/${page}` : '#'
                    }
                    hrefAllControls
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageOptions.length}
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}

export default ReactTable;
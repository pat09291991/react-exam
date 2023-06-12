import { useCallback, useEffect, useState } from "react";
import ReactTable from "../../component/ReactTable";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import AddEdit from "./AddEdit";
import ViewModal from "./ViewModal";
import { roleActions } from "../../services/RoleService";
import TableActionButton from "../../component/TableActionButton";
import { useForm } from "react-hook-form";

const Roles = () => {
    const { handleSubmit } = useForm();
    const [data, setData] = useState([]);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0)
    const [action, setAction] = useState("");
    const [updateTable, setUpdateTable] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const blankData = {
        name: "",
    }
    const [role, setRole] = useState(blankData);

    const TableButtons = useCallback(props => <TableActionButton id={props}
        toggleViewModal={toggleViewModal}
        toggleAddEditModal={toggleAddEditModal}
        buttonDisabled={buttonDisabled}
    />, []);


    const columns = [
        {
            Header: 'Role Name',
            accessor: 'name',
        },
        {
            Header: 'Created Date',
            accessor: 'created_at',
        },
        {
            Header: 'Last Upate',
            accessor: 'updated_at',
        },
        {
            // Make an expander cell
            Header: "Actions",
            id: 'expander', // It needs an ID
            Cell: ({ row }) => TableButtons(row.original.id)
        },
    ]

    const toggleAddEditModal = (id) => {
        setRole(blankData);
        setAction("");
        if (!openAddEditModal) {
            setAction(id ? "edit" : "add")
            if (id) {
                setButtonDisabled(true)
                roleActions.getRole(
                    id,
                    setRole,
                    setButtonDisabled,
                    setOpenAddEditModal
                ).catch(error => {
                    console.error('Unhandled promise rejection:', error);
                });
            } else {
                setOpenAddEditModal(!openAddEditModal);
            }
        } else {
            setOpenAddEditModal(!openAddEditModal);
        }
    }

    const toggleViewModal = (id) => {
        setRole(blankData);
        setAction("");
        if (!openViewModal) {
            setAction("view")
            if (id) {
                setButtonDisabled(true)
                roleActions.getRole(
                    id,
                    setRole,
                    setButtonDisabled,
                    setOpenViewModal
                ).catch(error => {
                    console.error('Unhandled promise rejection:', error);
                });
            } else {
                setOpenViewModal(!openViewModal);
            }
        } else {
            setOpenViewModal(!openViewModal);
        }
    }

    useEffect(() => {
        setLoading(true);
        roleActions.getRoles(
            setData,
            setLoading,
            setPageCount,
            sizePerPage,
            currentPage,
            searchText
        ).catch(error => {
            console.error('Unhandled promise rejection:', error);
        });
    }, [currentPage, sizePerPage, updateTable]);

    const handleFilter = () => {
        setLoading(true);
        roleActions.getRoles(
            setData,
            setLoading,
            setPageCount,
            sizePerPage,
            currentPage,
            searchText
        ).catch(error => {
            console.error('Unhandled promise rejection:', error);
        });
    }

    return (
        <>
            <AddEdit
                openAddEditModal={openAddEditModal}
                toggleAddEditModal={toggleAddEditModal}
                setOpenAddEditModal={setOpenAddEditModal}
                action={action}
                role={role}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
            />
            <ViewModal
                openViewModal={openViewModal}
                toggleViewModal={toggleViewModal}
                setOpenViewModal={setOpenViewModal}
                role={role}
            />
            <Row className="mb-4">
                <Col md="12" className="mb-2">
                    <Button disabled={buttonDisabled} color="success" onClick={() => toggleAddEditModal(0)}>Add +</Button>
                </Col>
                <Form onSubmit={handleSubmit(handleFilter)}>
                    <Col md="3">
                        <Label><small>Search By: Name</small></Label>
                        <Input
                            name="search"
                            defaultValue={""}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </Col>
                    <Col md="12" className="mt-2">
                        <Button color="primary">Filter</Button>
                    </Col>
                </Form>
            </Row>
            <ReactTable
                columns={columns}
                data={data}
                sizePerPage={sizePerPage}
                setSizePerPage={setSizePerPage}
                loading={loading}
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
            />
        </>
    )
}

export default Roles;
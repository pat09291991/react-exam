import { useCallback, useEffect, useState } from "react";
import ReactTable from "../../component/ReactTable";
import { userActions } from "../../services/UserService";
import { Button, Card, CardBody, Col, Label, Row, Form, Input } from "reactstrap";
import Select from "react-select";
import { filterActions } from "../../services/FilterService";
import AddEdit from "./AddEdit";
import ViewModal from "./ViewModal";
import TableActionButton from "../../component/TableActionButton";
import { useForm } from "react-hook-form";

const Users = () => {
    const { handleSubmit } = useForm();
    const [data, setData] = useState([]);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0)
    const [action, setAction] = useState("");
    const [searchText, setSearchText] = useState('')
    const [updateTable, setUpdateTable] = useState(false);
    const [selectOptions, setSelectOptions] = useState({
        roles: [],
    });
    const [filters, setFilters] = useState({
        roles: [],
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const blankData = {
        full_name: "",
        email_address: "",
        roles: "",
        password: "",
        password_confirmation: ""
    }
    const [user, setUser] = useState(blankData);

    const TableButtons = useCallback(props => <TableActionButton id={props}
        toggleViewModal={toggleViewModal}
        toggleAddEditModal={toggleAddEditModal}
        buttonDisabled={buttonDisabled}
    />, []);

    const columns = [
        {
            Header: 'Full Name',
            accessor: 'full_name',
        },
        {
            Header: 'Email',
            accessor: 'email_address',
        },
        {
            Header: 'Roles',
            accessor: 'roles',
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
            Cell: ({ row }) => TableButtons(row.original.id),
        },
    ]

    const toggleAddEditModal = (id) => {
        setUser(blankData);
        setAction("");
        if (!openAddEditModal) {
            setAction(id ? "edit" : "add")
            if (id) {
                setButtonDisabled(true)
                userActions.getUser(
                    id,
                    setUser,
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
        setUser(blankData);
        setAction("");
        if (!openViewModal) {
            setAction("view")
            if (id) {
                setButtonDisabled(true)
                userActions.getUser(
                    id,
                    setUser,
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
        filterActions.getFilters(setSelectOptions).catch(error => {
            console.error('Unhandled promise rejection:', error);
        });
    }, [])

    useEffect(() => {
        if (filters.roles.length || data.length) {
            setLoading(true);
            userActions.getUsers(
                setData,
                setLoading,
                setPageCount,
                sizePerPage,
                currentPage,
                filters,
                searchText
            ).catch(error => {
                console.error('Unhandled promise rejection:', error);
            });
        }
    }, [currentPage, sizePerPage, updateTable, filters]);

    const handleRoleFilter = (roles) => {
        const roleIds = roles.map(role => {
            return role.value
        });
        setFilters({ ...filters, roles: roleIds })
    }

    const handleFilter = () => {
        setLoading(true);
        userActions.getUsers(
            setData,
            setLoading,
            setPageCount,
            sizePerPage,
            currentPage,
            filters,
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
                user={user}
                selectOptions={selectOptions}
                setUpdateTable={setUpdateTable}
                updateTable={updateTable}
            />
            <ViewModal
                openViewModal={openViewModal}
                toggleViewModal={toggleViewModal}
                setOpenViewModal={setOpenViewModal}
                user={user}
            />
            <Card className="mt-5 shadow">
                <CardBody>
                    <Button disabled={buttonDisabled} color="success" className="mb-4" onClick={() => toggleAddEditModal(0)}>Add +</Button>
                    <Form onSubmit={handleSubmit(handleFilter)}>
                        <Row className="mb-4">
                            <Col md="4">
                                <Select
                                    isMulti
                                    defaultValue={''}
                                    options={selectOptions.roles}
                                    onChange={(roles) => handleRoleFilter(roles)}
                                    placeholder="Select roles"
                                />
                            </Col>
                            <Col md="4">
                                <Input
                                    name="search"
                                    placeholder="Search By: Full name and Email"
                                    defaultValue={""}
                                    disabled={!filters.roles.length}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                    }}
                                />
                            </Col>
                            <Col md="12" className="mt-2">
                                <Button color="primary">Filter</Button>
                            </Col>
                        </Row>
                    </Form>
                    <ReactTable
                        columns={columns}
                        data={data}
                        sizePerPage={sizePerPage}
                        setSizePerPage={setSizePerPage}
                        loading={loading}
                        setCurrentPage={setCurrentPage}
                        pageCount={pageCount}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default Users;
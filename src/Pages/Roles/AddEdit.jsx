import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Card, CardBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { roleActions } from "../../services/RoleService";

const AddEdit = ({
    openAddEditModal,
    toggleAddEditModal,
    setOpenAddEditModal,
    action,
    role,
    setUpdateTable,
    updateTable
}) => {
    const { handleSubmit, control, clearErrors, reset, formState: { errors } } = useForm();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        clearErrors([
            "name",
        ])
        reset();
    }, [openAddEditModal])

    const onSubmit = (data) => {
        setButtonDisabled(true)
        if (action == "add") {
            roleActions.postRole(
                data,
                setButtonDisabled,
                setOpenAddEditModal,
                setUpdateTable,
                updateTable
            ).catch(error => {
                console.error('Unhandled promise rejection:', error);
            });
        } else {
            roleActions.putRole(
                role.id,
                data,
                setButtonDisabled,
                setOpenAddEditModal,
                setUpdateTable,
                updateTable
            ).catch(error => {
                console.error('Unhandled promise rejection:', error);
            });
        }
    }

    return (
        <Modal isOpen={openAddEditModal} backdrop="static" size="xs">
            <ModalHeader toggle={toggleAddEditModal}>{action == "add" ? "Add" : "Edit"} Role {role.name ? " - " + role.name : ""}</ModalHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <Card className="mb-3 shadow-sm">
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label>Role Name <span className="text-danger">*</span></Label>
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{ required: true }}
                                            defaultValue={role.name}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    defaultValue={role.name}
                                                    invalid={errors?.name ? true : false}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <small className="text-danger">
                                            {errors?.name && errors.name.type == "required" && "Role name is required"}
                                        </small>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={buttonDisabled} className="shadow" color="success">Save</Button>{' '}
                    <Button disabled={buttonDisabled} className="shadow" onClick={() => setOpenAddEditModal(false)}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default AddEdit;
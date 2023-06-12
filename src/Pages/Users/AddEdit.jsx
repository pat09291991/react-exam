import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Card, CardBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { userActions } from "../../services/UserService";

const AddEdit = ({
    openAddEditModal,
    toggleAddEditModal,
    setOpenAddEditModal,
    action,
    user,
    selectOptions,
    setUpdateTable,
    updateTable
}) => {
    const { handleSubmit, control, clearErrors, getValues, reset, formState: { errors } } = useForm();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        clearErrors([
            "full_name",
            "email_address",
            "roles",
            "password",
            "password_confirmation"
        ])
        reset();
    }, [openAddEditModal])

    const onSubmit = (data) => {
        setButtonDisabled(true)
        data.roles = data.roles.map(role => {
            return role.value
        });

        if (action == "add") {
            userActions.postUser(
                data,
                setButtonDisabled,
                setOpenAddEditModal,
                setUpdateTable,
                updateTable
            ).catch(error => {
                console.error('Unhandled promise rejection:', error);
            });
        } else {
            userActions.putUser(
                user.id,
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

    const handleResend = () => {
        setButtonDisabled(true)
        userActions.resendQr(
            user.id,
            setButtonDisabled,
            setOpenAddEditModal,
        ).catch(error => {
            console.error('Unhandled promise rejection:', error);
        });
    }

    return (
        <Modal isOpen={openAddEditModal} backdrop="static" size="xl">
            <ModalHeader toggle={toggleAddEditModal}>{action == "add" ? "Add" : "Edit"} User {user.full_name ? " - " + user.full_name : ""}</ModalHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <Card className="mb-3 shadow-sm">
                        <CardBody>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Full Name <span className="text-danger">*</span></Label>
                                        <Controller
                                            name="full_name"
                                            control={control}
                                            defaultValue={user.full_name}
                                            rules={{ required: true }}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    defaultValue={user.full_name}
                                                    invalid={errors?.full_name ? true : false}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <small className="text-danger">
                                            {errors?.full_name && errors.full_name.type == "required" && "First name is required"}
                                        </small>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Email Address<span className="text-danger">*</span></Label>
                                        <Controller
                                            name="email_address"
                                            control={control}
                                            rules={{ required: true }}
                                            defaultValue={user.email_address}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    defaultValue={user.email_address}
                                                    invalid={errors?.email_address ? true : false}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <small className="text-danger">
                                            {errors?.email_address && errors.email_address.type == "required" && "Email Address is required"}
                                        </small>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Roles <span className="text-danger">*</span></Label>
                                        <Controller
                                            name="roles"
                                            control={control}
                                            rules={{ required: action == "add" ? true : false }}
                                            defaultValue={user.roles}
                                            render={({ field: { onChange } }) => (
                                                <Select
                                                    isMulti
                                                    defaultValue={user.roles}
                                                    options={selectOptions.roles}
                                                    aria-invalid={errors?.roles ? true : false}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                        <small className="text-danger">
                                            {errors?.roles && errors.roles.type == "required" && "Role is required"}
                                        </small>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Password {action == "add" ? <span className="text-danger">*</span> : ""}</Label>
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue={""}
                                            rules={{ required: action == "add" ? true : false, minLength: 8 }}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    defaultValue={""}
                                                    invalid={errors?.password ? true : false}
                                                    onChange={onChange}
                                                    type="password"
                                                />
                                            )}
                                        />
                                        <small className="text-danger">
                                            {errors?.password && errors.password.type == "required" && "Password is required"}
                                            {errors?.password && errors.password.type == "minLength" && "Password must be atleast 8 characters"}
                                        </small>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Password Confirmation {action == "add" ? <span className="text-danger">*</span> : ""}</Label>
                                        <Controller
                                            name="password_confirmation"
                                            control={control}
                                            defaultValue={""}
                                            rules={{ required: false, validate: (value) => value == getValues('password') }}
                                            render={({ field: { onChange } }) => (
                                                <Input
                                                    defaultValue={""}
                                                    invalid={errors?.password_confirmation ? true : false}
                                                    onChange={onChange}
                                                    type="password"
                                                />
                                            )}
                                        />
                                        <small className="text-danger">
                                            {errors?.password_confirmation && errors.password_confirmation.type == "required" && "Password is required"}
                                            {errors?.password_confirmation && errors.password_confirmation.type == "validate" && "Password does not matched"}
                                        </small>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    {action == "edit" && getValues('role_id')?.value == 4 ?
                        <Button disabled={buttonDisabled} onClick={handleResend} className="shadow" color="success">
                            Resend QR code
                        </Button> :
                        ""}
                    <Button disabled={buttonDisabled} className="shadow" color="success">Save</Button>{' '}
                    <Button disabled={buttonDisabled} className="shadow" onClick={() => setOpenAddEditModal(false)}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default AddEdit;
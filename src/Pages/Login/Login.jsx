import { useState } from "react";
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { authActions } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import '../../index.css'
import { isMobile } from "react-device-detect";
import { useForm, Controller } from "react-hook-form";

const Login = ({ setRoles }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { handleSubmit, control, clearErrors, getValues, reset, formState: { errors } } = useForm();

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleLogin = (data) => {
        setButtonDisabled(true);
        authActions.login(
            data,
            setError,
            navigate,
            setRoles,
            setButtonDisabled
        ).catch(error => {
            console.error('Unhandled promise rejection:', error);
        });
    }

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center bg-dark px-0 mx-0 vh-100">
            <Card className={isMobile ? "shadow w-100" : "shadow w-30"}>
                <CardHeader>
                    <h5 className="fw-bolder">Login</h5>
                </CardHeader>
                <CardBody className="py-5">
                    {error ? <Alert color="danger" className="text-center mx-2">{error}</Alert> : ""}
                    <Form onSubmit={handleSubmit(handleLogin)}>
                        <Row className="align-items-center justify-content-center">
                            <Col md="8">
                                <FormGroup>
                                    <Label>Email Address<span className="text-danger">*</span></Label>
                                    <Controller
                                        name="email_address"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={""}
                                        render={({ field: { onChange } }) => (
                                            <Input
                                                defaultValue={""}
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
                            <Col md="8">
                                <FormGroup>
                                    <Label>Password <span className="text-danger">*</span></Label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={""}
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
                                    </small>
                                </FormGroup>
                            </Col>
                            <Col md="12" className="text-center">
                                <Button disabled={buttonDisabled}>Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}

export default Login;
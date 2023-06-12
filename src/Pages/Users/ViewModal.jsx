import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

const ViewModal = ({
    openViewModal,
    toggleViewModal,
    setOpenViewModal,
    user
}) => {

    return (
        <Modal isOpen={openViewModal} backdrop="static" size="lg">
            <ModalHeader toggle={toggleViewModal}></ModalHeader>
            <ModalBody>
                <Card className="shadow-sm">
                    <CardBody>
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td className="fw-bolder">Full Name</td>
                                    <td>{user.full_name}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bolder">Email Address</td>
                                    <td>{user.email_address}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bolder">Roles</td>
                                    <td>
                                        <ul className="mb-0">
                                            {user.roles && (
                                                user.roles.map((role, index) => {
                                                    return <li key={index}>{role.label}</li>
                                                })
                                            )}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setOpenViewModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ViewModal;
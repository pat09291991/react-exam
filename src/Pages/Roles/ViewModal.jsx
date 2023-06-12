import { useState } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

const ViewModal = ({
    openViewModal,
    toggleViewModal,
    setOpenViewModal,
    role
}) => {
    return (
        <Modal isOpen={openViewModal} backdrop="static" size="lg">
            <ModalHeader toggle={toggleViewModal}>View</ModalHeader>
            <ModalBody>
                <Card className="shadow-sm">
                    <CardBody>
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td className="fw-bolder">Role Name</td>
                                    <td>{role.name}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bolder">Date Created</td>
                                    <td>{role.created_at}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bolder">Last Update</td>
                                    <td>{role.updated_at}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={()=>setOpenViewModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ViewModal;
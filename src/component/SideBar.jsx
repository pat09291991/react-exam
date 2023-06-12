import { Fragment, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { authActions } from "../services/AuthService";

const SideBar = ({ roles }) => {
    const navigate = useNavigate();
    const lastPath = window.location.href.split("/").pop();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const adminSideBar = [
        { name: "users", label: "Users", path: "/users" },
        { name: "roles", label: "Roles", path: "/roles" },
    ];

    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
    const handleSideBar = () => {
        setSideBarCollapsed(!sideBarCollapsed);
    }

    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const handleLogout = () => {
        setOpenLogoutModal(!openLogoutModal);
    }

    const handleProceedLogout = () => {
        setButtonDisabled(true)
        authActions.logout(navigate).catch(error => {
            console.error('Unhandled promise rejection:', error);
        });
    }

    return (
        <>
            <Sidebar collapsed={sideBarCollapsed} className="shadow vh-100 position-sticky top-0 z-3">
                <div>
                    <Menu>
                        <MenuItem className="fs-2 mb-4 fw-bold" icon={<FcSettings />} component={<Link to="/" />}>
                            EXAM
                        </MenuItem>
                    </Menu>
                    <Menu menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            // only apply styles on first level elements of the tree
                            return {
                                backgroundColor: active ? 'grey' : "",
                            };
                        },
                    }}>
                        {JSON.parse(roles).includes('Administrator') ?
                            <SubMenu icon={<GrUserAdmin className="fs-5" />} label="Admin">
                                {adminSideBar.map((item) => {
                                    return (
                                        <Fragment key={item.name}>
                                            <MenuItem active={lastPath == item.name} component={<Link to={item.path} />}>{item.label}</MenuItem>
                                        </Fragment>
                                    )
                                })}
                            </SubMenu>
                            : ""}
                        <MenuItem
                            active={lastPath == "logout"}
                            icon={<BiLogOut className="fs-5" />}
                            onClick={handleLogout}
                        >
                            Logout
                        </MenuItem>
                    </Menu>

                </div>
                <div className="position-absolute bottom-0 end-0">
                    <Menu className="text-center shadow">
                        <MenuItem onClick={() => handleSideBar()}>
                            {
                                sideBarCollapsed ?
                                    <RxDoubleArrowRight className="fs-4" /> :
                                    <RxDoubleArrowLeft className="fs-4" />
                            }
                        </MenuItem>
                    </Menu>
                </div>
            </Sidebar>
            <Modal isOpen={openLogoutModal} backdrop="static" size="md">
                <ModalHeader>Logout</ModalHeader>
                <ModalBody className="text-center">Do you really want to log out?</ModalBody>
                <ModalFooter>
                    <Button disabled={buttonDisabled} color="danger" onClick={handleProceedLogout}>Yes</Button>
                    <Button disabled={buttonDisabled} color="secondary" onClick={() => handleLogout()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default SideBar
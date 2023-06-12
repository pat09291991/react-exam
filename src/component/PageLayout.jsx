import { Card, CardBody, CardHeader, Navbar, NavbarBrand, NavbarText } from "reactstrap";
import SideBar from "./SideBar";
import { isMobile } from "react-device-detect";

const PageLayout = ({ children, title }) => {

    const name = localStorage.getItem('name') ? localStorage.getItem('name') : "";
    const roles = localStorage.getItem('roles') ? localStorage.getItem('roles') : "";

    return (
        <div className="d-flex overflow-x-auto">
            <SideBar roles={roles} />
            <main className={isMobile ? "px-3 my-3" : "px-3 my-3 w-100"}>
                <Card className="shadow mb-3">
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bolder">{title}</h5>
                        <div>
                            <p className="mb-0 fw-bolder">{name}</p>
                            <small className="text-secondary">{roles}</small>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {children}
                    </CardBody>
                </Card>
            </main>
        </div>
    )
};

export default PageLayout;
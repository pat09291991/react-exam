import { BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { UncontrolledTooltip } from "reactstrap";

const TableActionButton = ({ id, toggleViewModal, toggleAddEditModal, buttonDisabled }) => {
    return (
        <div className="text-center">
            <BsEye
                disabled={buttonDisabled}
                id={"view-btn" + id}
                role="button"
                className="mx-2 fs-2 my-1 text-secondary"
                onClick={() => toggleViewModal(id)}
            />
            <UncontrolledTooltip placement="top" target={"view-btn" + id}>
                View Details
            </UncontrolledTooltip>

            <FiEdit
                onClick={() => toggleAddEditModal(id)}
                color="warning"
                role="button"
                className="mx-2 fs-2 my-1 text-warning"
                id={"add-edit-btn" + id}
                disabled={buttonDisabled}
            />
            <UncontrolledTooltip placement="top" target={"add-edit-btn" + id}>
                Edit Details
            </UncontrolledTooltip>
        </div>
    )
}

export default TableActionButton;
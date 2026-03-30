import { emptyStageModal } from "./projectUtils"

function StageModal({ modal, setModal, submitStage }) {

    if (!modal.show) return null

    return (
        <div className="modal-backdrop-custom">
            <div className="card stage-modal shadow border-0">
                <div className="stage-modal-header">
                    <h5 className="mb-0">{modal.stage}</h5>
                    <button
                        type="button"
                        className="success-modal-close"
                        onClick={() => setModal(emptyStageModal)}
                        aria-label="Close stage modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="stage-modal-body">
                    <div className="stage-modal-field">
                        <label className="form-label mb-1">Completion Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={modal.date || ""}
                            onChange={(e) =>
                                setModal({ ...modal, date: e.target.value })
                            }
                        />
                    </div>

                    <div className="stage-modal-field">
                        <label className="form-label mb-1">Remark</label>
                        <input
                            type="text"
                            placeholder="Add a remark"
                            className="form-control"
                            value={modal.remark || ""}
                            onChange={(e) =>
                                setModal({ ...modal, remark: e.target.value })
                            }
                        />
                    </div>

                    {modal.stage === "Site Survey" && (
                        <div className="stage-modal-field">
                            <label className="form-label mb-1">Total Days</label>
                            <input
                                type="number"
                                placeholder="Enter number of days"
                                className="form-control"
                                value={modal.days || ""}
                                onChange={(e) =>
                                    setModal({ ...modal, days: e.target.value })
                                }
                            />
                        </div>
                    )}
                </div>

                <div className="stage-modal-actions d-flex gap-2 mt-2">
                    <button className="btn btn-primary w-100" onClick={submitStage}>
                        Save
                    </button>

                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => setModal(emptyStageModal)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StageModal

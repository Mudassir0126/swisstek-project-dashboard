function StageModal({ modal, setModal, submitStage }) {

    if (!modal.show) return null

    return (
        <div className="modal-backdrop-custom">

            <div className="card p-4 position-relative" style={{ width: "300px" }}>

                {/* ❌ CLOSE BUTTON */}
                <button
                    onClick={() => setModal({ show: false })}
                    style={{
                        position: "absolute",
                        top: "8px",
                        right: "10px",
                        border: "none",
                        background: "transparent",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}
                >
                    ✖
                </button>

                <h5>{modal.stage}</h5>

                {/* DATE */}
                <input
                    type="date"
                    className="form-control mt-2"
                    value={modal.date}
                    onChange={(e) =>
                        setModal({ ...modal, date: e.target.value })
                    }
                />

                {/* REMARK */}
                <input
                    type="text"
                    placeholder="Remark"
                    className="form-control mt-2"
                    value={modal.remark}
                    onChange={(e) =>
                        setModal({ ...modal, remark: e.target.value })
                    }
                />

                {/* SITE SURVEY EXTRA FIELD */}
                {modal.stage === "Site Survey" && (
                    <input
                        type="number"
                        placeholder="Total Days"
                        className="form-control mt-2"
                        value={modal.days}
                        onChange={(e) =>
                            setModal({ ...modal, days: e.target.value })
                        }
                    />
                )}

                {/* BUTTONS */}
                <div className="d-flex gap-2 mt-3">

                    <button className="btn btn-primary w-100" onClick={submitStage}>
                        Save
                    </button>

                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => setModal({ show: false })}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    )
}

export default StageModal
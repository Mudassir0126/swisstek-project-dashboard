function SuccessModal({ show, onClose }) {

    if (!show) return null

    return (
        <div className="modal-backdrop-custom">

            <div className="card p-4 text-center position-relative">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
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

                <h5 className="text-success">Project Added</h5>

                <button className="btn btn-success mt-3" onClick={onClose}>
                    OK
                </button>

            </div>

        </div>
    )
}

export default SuccessModal
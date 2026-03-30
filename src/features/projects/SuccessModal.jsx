function SuccessModal({ show, onClose }) {

    if (!show) return null

    return (
        <div className="modal-backdrop-custom">
            <div className="card success-modal shadow border-0">
                <div className="success-modal-header">
                    <h5 className="text-success mb-0">Project Added</h5>
                    <button
                        type="button"
                        className="success-modal-close"
                        onClick={onClose}
                        aria-label="Close success popup"
                    >
                        &times;
                    </button>
                </div>

                <p className="text-muted mb-3">
                    Your project has been added successfully.
                </p>

                <button className="btn btn-success w-100" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default SuccessModal

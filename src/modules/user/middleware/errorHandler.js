export const errorHandler = (err, req, res, next) => {
    console.error(err); // بس للـ debugging
    if (err.name === "ValidationError") {
        const errors = Object.keys(err.errors).reduce((acc, key) => {
            acc[key] = err.errors[key].message;
            return acc;
        }, {});
        return res.status(400).json({ message: "Validation Error", errors });
    }
    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(404).json({ message: "Resource not found" });
    }
    // أي خطأ تاني
    res.status(500).json({ message: "Server error", error: err.message });
};

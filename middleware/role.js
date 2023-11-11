export const role = (role) => (req, res, next) => {
    try {
        if (req.user.role === role)
            next();
        else throw new Error("")
    } catch (error) {
        res.status(403).send({message: "access denied"});
    }
};

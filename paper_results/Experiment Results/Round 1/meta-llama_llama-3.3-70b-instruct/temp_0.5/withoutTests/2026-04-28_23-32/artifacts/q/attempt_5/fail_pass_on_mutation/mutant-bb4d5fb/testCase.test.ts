import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            const stack = err.stack;
            if (stack.includes("isInternalFrame")) {
                throw new Error("Internal frame not filtered");
            }
        });
    });
});
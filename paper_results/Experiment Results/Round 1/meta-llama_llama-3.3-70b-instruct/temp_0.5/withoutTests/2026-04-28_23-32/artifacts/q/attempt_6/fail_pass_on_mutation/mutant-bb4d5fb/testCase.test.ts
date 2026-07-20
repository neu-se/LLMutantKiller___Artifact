import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            const stack = err.stack;
            const lines = stack.split("\n");
            const lastLine = lines[lines.length - 1];
            if (lastLine.includes("q.js")) {
                throw new Error("Internal frame not filtered");
            }
        });
    });
});
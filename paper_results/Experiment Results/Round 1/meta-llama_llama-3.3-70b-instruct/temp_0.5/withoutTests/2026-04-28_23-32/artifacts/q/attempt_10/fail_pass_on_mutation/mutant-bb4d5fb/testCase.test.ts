import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.reject(error);
        let lineNumber = 0;
        promise.then(null, (err) => {
            const stack = err.stack;
            const lines = stack.split("\n");
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes("q.js")) {
                    lineNumber = i;
                }
            }
            expect(lineNumber).toBeGreaterThan(0);
        });
    });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nodeify", () => {
    it("should return the promise when no nodeback is provided", () => {
        const promise = Q.resolve(42);
        const result = promise.nodeify();
        expect(result).toBe(promise);
    });
});
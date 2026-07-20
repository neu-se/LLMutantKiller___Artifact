import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fail", () => {
    it("should reject with the given reason", () => {
        const promise = q(10);
        const error = new Error("Test error");
        const rejectedPromise = promise["catch"](error);
        return rejectedPromise.then(
            () => { expect(true).toBe(false); },
            (reason: Error) => { expect(reason).toBe(error); }
        );
    });
});
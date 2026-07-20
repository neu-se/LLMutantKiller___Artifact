import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fail", () => {
    it("should reject with the given reason", () => {
        const promise = q(10);
        const rejectedPromise = promise["catch"](() => { throw new Error("Test error"); });
        return rejectedPromise.then(
            () => { expect(true).toBe(false); },
            (reason: Error) => { expect(reason.message).toBe("Test error"); }
        );
    });
});
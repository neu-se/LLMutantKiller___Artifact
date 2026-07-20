import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fail", () => {
    it("should reject with the given reason", () => {
        const promise = q.reject("Test error");
        return promise.then(
            () => { expect(true).toBe(false); },
            (reason: string) => { expect(reason).toBe("Test error"); }
        );
    });
});
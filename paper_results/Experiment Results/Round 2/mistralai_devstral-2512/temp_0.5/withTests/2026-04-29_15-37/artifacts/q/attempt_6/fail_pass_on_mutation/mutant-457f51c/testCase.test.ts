import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the promise for rejected promises and set exception property", () => {
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);
        const result = rejectedPromise.valueOf();
        expect(result).toBe(rejectedPromise);
        expect('exception' in result).toBe(true);
        expect(result.exception).toBe(error);
    });
});
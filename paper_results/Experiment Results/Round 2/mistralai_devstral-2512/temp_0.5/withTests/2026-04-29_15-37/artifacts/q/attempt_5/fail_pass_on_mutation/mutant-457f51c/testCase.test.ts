import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior for rejected promises", () => {
    it("should return the promise itself when state is rejected", () => {
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);
        const result = rejectedPromise.valueOf();
        expect(result).toBe(rejectedPromise);
        expect(result.exception).toBe(error);
    });
});
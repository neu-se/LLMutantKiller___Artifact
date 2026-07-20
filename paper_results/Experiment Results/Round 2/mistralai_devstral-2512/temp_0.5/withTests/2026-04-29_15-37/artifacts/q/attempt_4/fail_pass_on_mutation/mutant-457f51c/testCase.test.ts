import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise exception property", () => {
    it("should set exception property for rejected promises", () => {
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);
        expect(rejectedPromise.exception).toBe(error);
    });
});
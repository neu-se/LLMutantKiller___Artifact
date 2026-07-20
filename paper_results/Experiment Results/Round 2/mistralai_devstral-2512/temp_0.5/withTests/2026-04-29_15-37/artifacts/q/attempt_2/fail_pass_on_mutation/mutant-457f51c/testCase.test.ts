import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the promise itself for rejected promises", () => {
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);
        expect(rejectedPromise.valueOf()).toBe(rejectedPromise);
    });
});
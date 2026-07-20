import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reject a promise with a condition that checks for null error", () => {
        const error = null;
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            expect(err === null).toBe(true);
        });
        const promise2 = Q.reject(new Error("Test Error"));
        promise2.then(null, (err) => {
            expect(err === null).toBe(false);
        });
    });
});
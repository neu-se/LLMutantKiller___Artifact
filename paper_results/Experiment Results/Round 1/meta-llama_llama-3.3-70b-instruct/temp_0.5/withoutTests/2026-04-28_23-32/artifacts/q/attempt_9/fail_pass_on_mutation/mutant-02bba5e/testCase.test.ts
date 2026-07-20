import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reject a promise with null reason and not modify the error", () => {
        const error = null;
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            expect(err).toBe(null);
        });
    });

    it("should reject a promise with non-null reason and not modify the error", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            expect(err).toBe(error);
        });
    });
});
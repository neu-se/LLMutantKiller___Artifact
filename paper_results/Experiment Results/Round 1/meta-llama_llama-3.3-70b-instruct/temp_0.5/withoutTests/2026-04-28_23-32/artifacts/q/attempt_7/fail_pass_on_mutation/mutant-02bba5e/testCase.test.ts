import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reject a promise when Q.reject is called with a null reason", () => {
        const promise = Q.reject(null);
        expect(promise.isRejected()).toBe(true);
        promise.then(null, (err) => {
            expect(err).toBeNull();
        });
    });

    it("should reject a promise when Q.reject is called with a non-null reason", () => {
        const promise = Q.reject(new Error());
        expect(promise.isRejected()).toBe(true);
        promise.then(null, (err) => {
            expect(err).toBeInstanceOf(Error);
        });
    });
});
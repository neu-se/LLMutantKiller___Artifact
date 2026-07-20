import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle promise rejection", () => {
        const promise = Q.reject(null);
        promise.then(null, (err) => {
            expect(err).toBeNull();
        });
        const promise2 = Q.reject(new Error());
        promise2.then(null, (err) => {
            expect(err).toBeInstanceOf(Error);
        });
        const promise3 = Q.reject(null);
        promise3.then(null, (err) => {
            expect(err).toBeNull();
        });
    });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should make a long stack trace only if the error is not null", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            expect(err.stack).toBeDefined();
        });
    });

    it("should not make a long stack trace if the error is null", () => {
        const error = null;
        const promise = Q.reject(error);
        promise.then(null, (err) => {
            expect(err).toBeNull();
        });
    });
});
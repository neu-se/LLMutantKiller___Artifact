import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejection", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        promise.done();
        expect(() => promise.done()).toThrowError(error);
    });
});
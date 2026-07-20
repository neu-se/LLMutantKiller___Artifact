import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return a promise that resolves with the given value", () => {
        const value = "test";
        const promise = Q(value).thenResolve(value);
        return promise.then((result) => {
            expect(result).toBe(value);
        });
    });
});
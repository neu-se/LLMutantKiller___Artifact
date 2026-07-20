import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return the same promise when a promise is passed to it", () => {
        const promise = Q(5);
        const samePromise = Q(promise);
        expect(samePromise).toBe(promise);
    });
});
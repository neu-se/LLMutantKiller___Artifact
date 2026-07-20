import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return a promise when called with a value", () => {
        const promise = Q(1);
        expect(promise.then).toBeInstanceOf(Function);
    });
});
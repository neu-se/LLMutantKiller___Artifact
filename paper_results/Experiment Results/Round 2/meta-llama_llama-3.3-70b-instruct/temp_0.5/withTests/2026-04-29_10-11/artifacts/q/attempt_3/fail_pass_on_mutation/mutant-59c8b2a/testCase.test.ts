import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return a promise with valueOf function that returns the promise's value", () => {
        const promise = Q(5);
        expect(promise.valueOf()).toBe(5);
    });
});
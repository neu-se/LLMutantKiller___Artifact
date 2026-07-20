import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should resolve a promise when given a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });
});
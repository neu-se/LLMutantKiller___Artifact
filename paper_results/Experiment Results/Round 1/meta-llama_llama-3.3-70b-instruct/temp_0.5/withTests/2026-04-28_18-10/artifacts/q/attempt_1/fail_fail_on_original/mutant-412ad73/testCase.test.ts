import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should create a promise when given a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });
});
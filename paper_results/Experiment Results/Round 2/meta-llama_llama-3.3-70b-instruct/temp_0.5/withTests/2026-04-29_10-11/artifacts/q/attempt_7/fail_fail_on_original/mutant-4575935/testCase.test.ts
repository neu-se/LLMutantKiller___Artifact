import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q behavior", () => {
    it("should create a promise that resolves with a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });
});
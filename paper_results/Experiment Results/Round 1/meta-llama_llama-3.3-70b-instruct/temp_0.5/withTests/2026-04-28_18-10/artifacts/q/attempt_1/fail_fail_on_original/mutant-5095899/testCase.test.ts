import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js functionality", () => {
    it("should create a promise that resolves with the given value", () => {
        const promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
        expect(promise.inspect().value).toBe(10);
    });
});
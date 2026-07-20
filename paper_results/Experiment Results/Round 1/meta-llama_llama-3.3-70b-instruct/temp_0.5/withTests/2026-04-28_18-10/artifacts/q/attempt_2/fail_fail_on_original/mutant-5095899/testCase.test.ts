import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js functionality", () => {
    it("should create a promise that resolves with the given value", () => {
        const global = typeof window !== "undefined" ? window : self;
        const originalQ = global.Q;
        global.Q = Q;

        const promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
        expect(promise.inspect().value).toBe(10);

        global.Q = originalQ;
    });
});
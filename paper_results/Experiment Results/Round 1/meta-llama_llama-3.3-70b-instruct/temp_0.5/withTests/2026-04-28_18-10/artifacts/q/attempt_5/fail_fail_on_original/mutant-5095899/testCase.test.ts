import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js functionality", () => {
    it("should create a promise that resolves with the given value", () => {
        const promise = q(10);
        expect(promise.isFulfilled()).toBe(true);
        expect(promise.inspect().value).toBe(10);

        // Test the mutation by checking if the global Q object is defined
        const global = typeof window !== "undefined" ? window : globalThis;
        expect(global.Q).toBeDefined();
    });
});
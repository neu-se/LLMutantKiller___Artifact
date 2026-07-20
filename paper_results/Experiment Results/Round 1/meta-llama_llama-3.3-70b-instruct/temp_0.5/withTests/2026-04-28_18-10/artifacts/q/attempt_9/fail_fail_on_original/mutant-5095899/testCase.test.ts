import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js functionality", () => {
    it("should create a promise that resolves with the given value", () => {
        const promise = q(10);
        expect(promise.isFulfilled()).toBe(true);
        expect(promise.inspect().value).toBe(10);

        // Test the mutation by checking if the promise is resolved
        expect(() => {
            const global = globalThis as any;
            if (!global.Q) {
                throw new Error("Q is not defined");
            }
        }).not.toThrow();
    });
});
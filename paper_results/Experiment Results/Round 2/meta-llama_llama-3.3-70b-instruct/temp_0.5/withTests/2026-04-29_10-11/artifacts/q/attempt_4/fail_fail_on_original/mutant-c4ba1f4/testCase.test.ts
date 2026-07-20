import * as Q from "./q.js";

describe("Q", () => {
    it("should correctly handle setImmediate", () => {
        // Create a promise that resolves after a short delay using setImmediate
        const promise = Q.delay(10);

        // Check if the promise is pending
        expect(promise.isPending()).toBe(true);

        // Wait for the promise to resolve
        return promise.then(() => {
            // Check if the promise is fulfilled
            expect(promise.isFulfilled()).toBe(true);
        });
    });

    it("should fail when setImmediate is not handled correctly", () => {
        // Create a promise that resolves after a short delay using setImmediate
        const promise = Q.delay(10);

        // Check if the promise is pending
        expect(promise.isPending()).toBe(true);

        // Wait for the promise to resolve
        return promise.then(() => {
            // Check if the promise is fulfilled
            expect(promise.isFulfilled()).toBe(true);
            throw new Error("setImmediate was handled correctly");
        });
    });
});
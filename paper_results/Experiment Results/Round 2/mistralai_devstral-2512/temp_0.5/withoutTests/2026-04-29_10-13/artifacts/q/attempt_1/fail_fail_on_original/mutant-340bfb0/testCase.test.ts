import { Q } from "./q.js";

describe("Q promise error stack tracking", () => {
    it("should correctly track minimum stack counter in error objects", async () => {
        // Create a chain of promises to build up stack traces
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        const promise2 = promise1.then(() => {
            throw new Error("Should not reach here");
        });

        try {
            await promise2;
            throw new Error("Promise should have rejected");
        } catch (e) {
            // The error should have the __minimumStackCounter__ property set
            // In the mutated version, this property will be set with an empty string key
            // which should still be detectable as a property on the object
            expect(e).toHaveProperty("__minimumStackCounter__");
            expect(typeof e.__minimumStackCounter__).toBe("number");
        }
    });
});
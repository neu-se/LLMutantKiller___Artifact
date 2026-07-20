const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error stack tracking", () => {
    it("should correctly set __minimumStackCounter__ property on errors", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises to build up stack traces
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        const promise2 = promise1.then(() => {
            throw new Error("Should not reach here");
        });

        try {
            await promise2;
            fail("Promise should have rejected");
        } catch (e: any) {
            // The error should have the __minimumStackCounter__ property set
            // In the mutated version, this property will be set with an empty string key
            // which should still be detectable as a property on the object
            expect(e).toHaveProperty("__minimumStackCounter__");
            expect(typeof e.__minimumStackCounter__).toBe("number");
        }
    });
});
import { Q } from "./q";

describe("Q long stack traces", () => {
    it("should properly configure __minimumStackCounter__ property", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises to build up stack traces
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const deferred3 = Q.defer();

        // Reject the innermost promise
        deferred3.reject(new Error("Test error"));

        // Chain the promises
        const promise = deferred1.promise
            .then(() => deferred2.promise)
            .then(() => deferred3.promise);

        try {
            await promise;
            fail("Promise should have rejected");
        } catch (error: any) {
            // Check that the error has the expected property configuration
            expect(error).toHaveProperty("__minimumStackCounter__");
            expect(Object.getOwnPropertyDescriptor(error, "__minimumStackCounter__")?.configurable).toBe(true);
            expect(Object.getOwnPropertyDescriptor(error, "__minimumStackCounter__")?.value).toBeDefined();
        }
    });
});
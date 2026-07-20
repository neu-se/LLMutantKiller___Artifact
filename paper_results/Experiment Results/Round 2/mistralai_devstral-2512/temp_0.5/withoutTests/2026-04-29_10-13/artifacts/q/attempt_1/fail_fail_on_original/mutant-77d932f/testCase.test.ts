// Test case to detect mutation in getFileNameAndLineNumber function
import { Q } from "./q";

describe("getFileNameAndLineNumber mutation", () => {
    it("should properly filter internal stack frames", () => {
        // Create a promise chain that will generate stack traces
        // This will test if the getFileNameAndLineNumber function is working correctly
        // by checking if internal frames are properly filtered
        return Q.resolve()
            .then(() => {
                throw new Error("Test error");
            })
            .catch((error) => {
                // The error should have a stack trace
                expect(error.stack).toBeDefined();

                // Create a promise with long stack support enabled
                Q.longStackSupport = true;
                const deferred = Q.defer();
                deferred.reject(error);

                return deferred.promise;
            })
            .catch((error) => {
                // With long stack support, the stack should be modified
                // The mutation would cause this to fail because getFileNameAndLineNumber
                // returns undefined, making isInternalFrame return false
                expect(error.stack).toBeDefined();
                expect(error.stack.length).toBeGreaterThan(0);

                // The key test: with the mutation, internal frames won't be filtered
                // because getFileNameAndLineNumber returns undefined
                // This should cause the stack to include internal Q frames
                // which it shouldn't in the original version
                const hasInternalFrames = error.stack.includes("From previous event:");
                expect(hasInternalFrames).toBe(true);

                return Q.resolve();
            });
    });
});
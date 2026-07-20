// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library setImmediate detection", () => {
    it("should correctly use setImmediate when available for async scheduling", (done) => {
        // Save original setImmediate if it exists
        const originalSetImmediate = global.setImmediate;

        // Create a mock setImmediate that tracks calls
        let setImmediateCalled = false;
        const mockSetImmediate = function(fn: Function) {
            setImmediateCalled = true;
            // Simulate setImmediate behavior using nextTick
            process.nextTick(fn);
            return { unref: () => {} };
        };

        // Add required properties to match setImmediate type
        (mockSetImmediate as any).__promisify__ = function() {
            return function(arg: any) {
                return new Promise((resolve, reject) => {
                    try {
                        const result = originalSetImmediate?.(arg);
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                });
            };
        };

        global.setImmediate = mockSetImmediate as any;

        try {
            // Force Q to re-evaluate the async mechanism by creating a new instance
            // We need to test the actual behavior, so we'll check if setImmediate is used
            const deferred = Q.defer();
            let resolved = false;

            deferred.promise.then(() => {
                resolved = true;
            });

            deferred.resolve(42);

            // Give some time for the async operation to complete
            setTimeout(() => {
                // In the original code, setImmediate should be called when available
                // In the mutated code, the condition is reversed so it won't be called
                expect(setImmediateCalled).toBe(true);
                expect(resolved).toBe(true);
                done();
            }, 50);
        } finally {
            // Restore original setImmediate
            global.setImmediate = originalSetImmediate;
        }
    }, 10000);
});
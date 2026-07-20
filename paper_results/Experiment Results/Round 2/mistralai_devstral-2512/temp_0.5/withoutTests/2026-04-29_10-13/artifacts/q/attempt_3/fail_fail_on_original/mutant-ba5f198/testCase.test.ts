// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library setImmediate detection", () => {
    it("should correctly use setImmediate when available for async scheduling", (done) => {
        // Save original setImmediate if it exists
        const originalSetImmediate = global.setImmediate;

        // Create a mock setImmediate that tracks calls
        let setImmediateCalled = false;
        global.setImmediate = function(fn: Function) {
            setImmediateCalled = true;
            // Simulate setImmediate behavior using nextTick
            process.nextTick(fn);
            return { unref: () => {} } as NodeJS.Immediate;
        };

        // Add the __promisify__ property to match the type
        (global.setImmediate as any).__promisify__ = originalSetImmediate?.__promisify__;

        try {
            // Create a deferred and resolve it
            const deferred = Q.defer();
            let resolvedValue: any = null;

            deferred.promise.then((value: any) => {
                resolvedValue = value;
            });

            deferred.resolve("test");

            // Check after a short delay
            setTimeout(() => {
                // In the original code, setImmediate should be called when available
                // In the mutated code, the condition is reversed so it won't be called
                expect(setImmediateCalled).toBe(true);
                expect(resolvedValue).toBe("test");
                done();
            }, 50);
        } finally {
            // Restore original setImmediate
            global.setImmediate = originalSetImmediate;
        }
    });
});
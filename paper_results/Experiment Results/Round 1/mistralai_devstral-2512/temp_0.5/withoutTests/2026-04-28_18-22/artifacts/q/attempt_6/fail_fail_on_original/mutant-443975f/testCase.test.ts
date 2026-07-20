const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library setImmediate usage", () => {
    it("should detect when setImmediate is not being used for scheduling", (done) => {
        // This test specifically checks if the mutation (if (false)) prevents setImmediate usage
        const originalSetImmediate = global.setImmediate;
        let setImmediateCalled = false;

        // Override setImmediate to track calls
        global.setImmediate = function(callback: (...args: any[]) => void): any {
            setImmediateCalled = true;
            return originalSetImmediate(callback);
        };

        // Create multiple promises to trigger scheduling
        const promises = [];
        for (let i = 0; i < 10; i++) {
            promises.push(Q.resolve(i));
        }

        Q.all(promises)
            .then(() => {
                // Restore original setImmediate
                global.setImmediate = originalSetImmediate;

                // In original code: setImmediate should be called
                // In mutated code: setImmediate won't be called due to "if (false)"
                expect(setImmediateCalled).toBe(true);
                done();
            })
            .catch((error) => {
                // Restore original setImmediate in case of error
                global.setImmediate = originalSetImmediate;
                done(error);
            });
    });
});
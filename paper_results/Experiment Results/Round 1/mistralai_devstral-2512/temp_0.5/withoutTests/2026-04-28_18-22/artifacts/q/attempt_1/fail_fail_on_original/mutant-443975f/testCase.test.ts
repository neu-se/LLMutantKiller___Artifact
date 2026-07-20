// vim:ts=4:sts=4:sw=4:
import { Q } from "./q.js";

describe("Q library setImmediate detection", () => {
    it("should use setImmediate when available in the environment", (done) => {
        // Save the original setImmediate
        const originalSetImmediate = global.setImmediate;

        // Mock setImmediate to track if it's being used
        let setImmediateCalled = false;
        global.setImmediate = function(callback: (...args: any[]) => void, ...args: any[]): any {
            setImmediateCalled = true;
            return originalSetImmediate.call(global, callback, ...args);
        };

        // Create a promise and check if setImmediate was used for scheduling
        Q.resolve(42).then((value) => {
            // Restore original setImmediate
            global.setImmediate = originalSetImmediate;

            // In the original code, setImmediate should be used when available
            // In the mutated code, it won't be used due to the "if (false)" condition
            expect(setImmediateCalled).toBe(true);
            expect(value).toBe(42);
            done();
        }).done();
    });
});
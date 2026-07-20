// Test to detect the mutation in q.js where process.toString() === "[object process]" was changed to process.toString() === ""
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should correctly identify Node.js environment", () => {
        // This test verifies that Q correctly identifies a Node.js environment
        // by checking if it uses process.nextTick when available

        return new Promise<void>((resolve, reject) => {
            // Check if we're in a Node.js environment
            if (typeof process !== "undefined" && typeof process.nextTick === "function") {
                const originalNextTick = process.nextTick;
                let nextTickCalled = false;

                // Override process.nextTick to detect if Q uses it
                process.nextTick = function(...args: any[]) {
                    nextTickCalled = true;
                    return originalNextTick.apply(this, args);
                };

                // Use Q.nextTick which should call process.nextTick in Node.js
                Q.nextTick(() => {
                    // Restore original nextTick
                    process.nextTick = originalNextTick;

                    if (nextTickCalled) {
                        resolve();
                    } else {
                        reject(new Error("Q.nextTick did not use process.nextTick"));
                    }
                });
            } else {
                // Not in Node.js environment, skip this test
                resolve();
            }
        });
    });
});
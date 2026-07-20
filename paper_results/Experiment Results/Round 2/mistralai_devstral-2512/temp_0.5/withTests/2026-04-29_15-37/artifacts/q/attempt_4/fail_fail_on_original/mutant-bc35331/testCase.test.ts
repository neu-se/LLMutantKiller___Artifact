// Test to detect the mutation in q.js where process.toString() === "[object process]" was changed to process.toString() === ""
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should use process.nextTick in Node.js environment", () => {
        // This test verifies that Q correctly identifies and uses process.nextTick in Node.js
        // The mutation changes the check from "[object process]" to empty string, which breaks Node.js detection

        // We'll test this by checking if Q.nextTick actually uses process.nextTick
        // by comparing behavior with setImmediate (which would be used as fallback)

        return new Promise((resolve, reject) => {
            // In Node.js, process.nextTick should execute before setImmediate
            let results = [];

            Q.nextTick(() => {
                results.push('nextTick');
                if (results.length === 2) {
                    // In original code with proper Node.js detection, nextTick should come first
                    // In mutated code, it might use setImmediate or setTimeout instead
                    expect(results).toEqual(['nextTick', 'immediate']);
                    resolve();
                }
            });

            setImmediate(() => {
                results.push('immediate');
                if (results.length === 2) {
                    // If this executes first, the mutation broke Node.js detection
                    reject(new Error('Node.js detection broken - setImmediate executed before nextTick'));
                }
            });
        });
    });
});
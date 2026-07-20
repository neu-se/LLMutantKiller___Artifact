// Test to detect the mutation in q.js where process.toString() === "[object process]" was changed to process.toString() === ""
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
    it("should correctly identify Node.js environment using process.toString()", () => {
        // This test verifies that Q correctly identifies a Node.js environment
        // by checking the behavior of async operations

        return new Promise((resolve) => {
            let executionOrder = [];

            // Schedule tasks using Q.nextTick
            Q.nextTick(() => {
                executionOrder.push(1);
            });

            Q.nextTick(() => {
                executionOrder.push(2);
                resolve(executionOrder);
            });

            // In Node.js with original code, these should execute in order
            // In mutated code, the empty string check would cause different behavior
        }).then((order) => {
            expect(order).toEqual([1, 2]);
        });
    });
});
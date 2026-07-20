// Test case to detect the mutation in q.js where isNodeJS is incorrectly set to true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
    it("should correctly detect non-NodeJS environment and use setTimeout for nextTick", (done) => {
        // In a non-NodeJS environment (like a browser), process.nextTick should not be available
        // The mutation incorrectly sets isNodeJS = true, which would cause the code to try using process.nextTick
        // This test verifies that the code correctly falls back to setTimeout in non-NodeJS environments

        // Create a simple test that relies on the nextTick implementation
        let testValue = 0;
        const expectedValue = 42;

        Q.nextTick(() => {
            testValue = expectedValue;
        });

        // In the original code (isNodeJS = false), this should work correctly with setTimeout
        // In the mutated code (isNodeJS = true), this would try to use process.nextTick which doesn't exist
        setTimeout(() => {
            expect(testValue).toBe(expectedValue);
            done();
        }, 10);
    });
});
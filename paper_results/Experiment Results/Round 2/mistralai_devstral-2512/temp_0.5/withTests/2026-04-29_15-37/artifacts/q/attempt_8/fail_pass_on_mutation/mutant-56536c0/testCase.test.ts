import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick fallback behavior", () => {
    it("should properly fall back when MessageChannel is not available", (done) => {
        // Store original MessageChannel
        const originalMessageChannel = (global as any).MessageChannel;

        // Temporarily make MessageChannel unavailable
        (global as any).MessageChannel = undefined;

        // Test that Q.nextTick still works
        let counter = 0;
        const expectedCount = 5;

        function testTask() {
            counter++;
            if (counter === expectedCount) {
                // Restore MessageChannel
                (global as any).MessageChannel = originalMessageChannel;

                // The test passes if we reach this point
                expect(counter).toBe(expectedCount);
                done();
            }
        }

        // Schedule tasks
        for (let i = 0; i < expectedCount; i++) {
            Q.nextTick(testTask);
        }
    });
});
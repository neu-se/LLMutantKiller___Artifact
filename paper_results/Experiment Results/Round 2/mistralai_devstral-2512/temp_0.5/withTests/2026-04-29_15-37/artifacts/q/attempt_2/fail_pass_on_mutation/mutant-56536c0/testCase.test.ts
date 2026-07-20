import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel fallback", () => {
    it("should work when MessageChannel is not available", (done) => {
        // Store the original MessageChannel
        const originalMessageChannel = (global as any).MessageChannel;

        // Simulate MessageChannel not being available
        (global as any).MessageChannel = undefined;

        // Test that Q.nextTick still works
        let counter = 0;
        const expectedCount = 3;

        function testTask() {
            counter++;
            if (counter === expectedCount) {
                // Restore MessageChannel
                (global as any).MessageChannel = originalMessageChannel;
                expect(counter).toBe(expectedCount);
                done();
            }
        }

        for (let i = 0; i < expectedCount; i++) {
            Q.nextTick(testTask);
        }
    });
});
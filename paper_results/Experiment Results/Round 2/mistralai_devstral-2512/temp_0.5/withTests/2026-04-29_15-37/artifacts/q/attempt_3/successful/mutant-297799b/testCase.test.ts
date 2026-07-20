import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
    it("should correctly filter stack traces to exclude internal frames", () => {
        // The mutation changes isInternalFrame to always return true
        // This would cause ALL stack frames to be filtered out as "internal"
        // We test this by checking that stack traces still contain useful information

        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a deep promise chain to generate multiple stack frames
        const error = new Error("Test error");
        let promise = Q.reject(error);

        // Add depth to create more stack frames
        for (let i = 0; i < 5; i++) {
            promise = promise.then(() => { throw error; });
        }

        return promise.catch((e: Error) => {
            // The stack trace should exist and contain multiple frames
            expect(e.stack).toBeDefined();
            expect(e.stack.length).toBeGreaterThan(0);

            // Count the number of stack frames (lines containing ".js")
            const stackLines = e.stack.split('\n');
            const jsFrames = stackLines.filter(line =>
                line.includes('.js') && line.includes(':')
            );

            // In the original code, we should have multiple frames
            // In the mutated code, most frames would be filtered out
            expect(jsFrames.length).toBeGreaterThan(2);

            // The stack should contain our test file name
            expect(e.stack).toContain("testCase.test.ts");
        });
    });
});
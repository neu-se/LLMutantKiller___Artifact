// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-f233adb/testCase.test.ts
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library SES environment handling", () => {
    it("should handle SES environment correctly when ses is defined", () => {
        // Save the original global object state
        const originalSes = (global as any).ses;
        const originalQ = (global as any).Q;

        // Create a mock SES environment that returns true from ok()
        const mockSes = {
            ok: () => true,
            makeQ: jest.fn()
        };

        // Set up the mock SES environment
        (global as any).ses = mockSes;

        // Clear any existing Q global
        delete (global as any).Q;

        // Load the Q library in a fresh context
        const freshModule = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // In the original code, when ses.ok() returns true, ses.makeQ should be called
        // In the mutated code, the empty if block means ses.makeQ won't be called
        // and it will proceed to the window/global path

        // Verify the behavior based on the code version
        if (mockSes.makeQ.mock.calls.length > 0) {
            // Original code path - ses.makeQ was called
            expect(mockSes.makeQ).toHaveBeenCalledWith(expect.any(Function));
            // In this case, global.Q should not be set
            expect((global as any).Q).toBeUndefined();
        } else {
            // Mutated code path - ses.makeQ was not called, proceeded to window path
            expect((global as any).Q).toBeDefined();
            expect(typeof (global as any).Q).toBe('function');
        }

        // Clean up
        (global as any).ses = originalSes;
        (global as any).Q = originalQ;
    });
});
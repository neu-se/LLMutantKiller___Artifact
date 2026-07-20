// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-f233adb/testCase.test.ts
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library SES environment handling", () => {
    it("should handle SES environment correctly when ses.ok() returns false", () => {
        // Save the original global object state
        const originalSes = global.ses;
        const originalQ = global.Q;

        // Create a mock SES environment that returns false from ok()
        const mockSes = {
            ok: () => false,
            makeQ: jest.fn()
        };

        // Set up the mock SES environment
        global.ses = mockSes;

        // Clear any existing Q global
        delete global.Q;

        // Load the Q library in a fresh context
        const freshModule = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // In the original code, when ses.ok() returns false, the code should proceed
        // to the window/global path and set global.Q
        // In the mutated code, the empty if block means it will skip to window/global path
        // So both should set global.Q, but we need to verify the behavior is correct

        // Verify Q is exported to global scope
        expect(global.Q).toBeDefined();
        expect(typeof global.Q).toBe('function');

        // Verify the module exports match the global
        expect(freshModule).toBe(global.Q);

        // Clean up
        global.ses = originalSes;
        global.Q = originalQ;
    });
});
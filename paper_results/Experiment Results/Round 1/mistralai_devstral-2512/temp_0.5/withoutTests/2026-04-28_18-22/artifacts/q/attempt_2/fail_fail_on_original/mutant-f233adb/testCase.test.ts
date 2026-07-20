// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-f233adb/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library SES environment handling", () => {
    it("should properly handle SES environment when ses is defined", () => {
        // Save the original global object state
        const originalSes = (global as any).ses;
        const originalQ = (global as any).Q;

        // Create a mock SES environment
        const mockSes = {
            ok: jest.fn().mockReturnValue(true),
            makeQ: jest.fn()
        };

        // Set up the mock SES environment
        (global as any).ses = mockSes;

        // Clear any existing Q global
        delete (global as any).Q;

        // Load the Q library in a fresh context to trigger the SES path
        // We need to simulate what happens when the library is loaded
        const module = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Verify that ses.makeQ was called with the definition
        expect(mockSes.makeQ).toHaveBeenCalledWith(expect.any(Function));

        // Clean up
        (global as any).ses = originalSes;
        (global as any).Q = originalQ;

        // Verify the module exports Q correctly
        expect(module.Q).toBeDefined();
        expect(typeof module.Q).toBe('function');
    });
});
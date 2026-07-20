// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-f233adb/testCase.test.ts
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library SES environment handling", () => {
    it("should call ses.makeQ when ses is defined and ses.ok() returns true", () => {
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
        expect(mockSes.makeQ).toHaveBeenCalledWith(expect.any(Function));

        // Clean up
        (global as any).ses = originalSes;
        (global as any).Q = originalQ;
    });
});
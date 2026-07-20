// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-f233adb/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library global export behavior", () => {
    it("should properly export Q to global scope when ses is not defined", () => {
        // Save the original global object state
        const originalSes = (global as any).ses;
        const originalQ = (global as any).Q;

        // Ensure ses is not defined to trigger the window/global path
        delete (global as any).ses;

        // Clear any existing Q global
        delete (global as any).Q;

        // Load the Q library
        const module = require('../../../../../../../../../../../subject_repositories/q/q.js');

        // Verify Q is exported to global scope
        expect((global as any).Q).toBeDefined();
        expect(typeof (global as any).Q).toBe('function');

        // Verify the module exports match the global
        expect(module.Q).toBe((global as any).Q);

        // Clean up
        (global as any).ses = originalSes;
        (global as any).Q = originalQ;
    });
});
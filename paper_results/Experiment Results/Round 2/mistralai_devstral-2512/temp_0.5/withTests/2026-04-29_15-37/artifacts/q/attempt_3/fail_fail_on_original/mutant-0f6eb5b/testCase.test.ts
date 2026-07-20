// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should verify longStackSupport is enabled by default when Q_DEBUG is set", () => {
        // Save original value
        const originalValue = Q.longStackSupport;

        // The mutation changes this from true to false
        // This test verifies the default behavior
        expect(Q.longStackSupport).toBe(true);

        // Restore original value
        Q.longStackSupport = originalValue;
    });
});
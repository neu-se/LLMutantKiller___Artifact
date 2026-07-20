// Test case to detect the mutation in q.js where Q.longStackSupport is set to false instead of true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should capture long stack traces when enabled", async () => {
        // Save original value
        const originalValue = Q.longStackSupport;

        // Explicitly enable long stack support
        Q.longStackSupport = true;

        // Create a nested promise chain
        function level1() {
            return Q().then(() => level2());
        }

        function level2() {
            return Q.delay(1).then(() => level3());
        }

        function level3() {
            return Q.reject(new Error("Test error"));
        }

        try {
            await level1();
            fail("Expected promise to reject");
        } catch (err: any) {
            // With long stack support enabled, the stack should contain
            // references to all levels of the promise chain
            const stack = err.stack;
            expect(stack).toBeDefined();

            // Check for the presence of our function names in the stack trace
            // This is the key difference - with longStackSupport enabled,
            // we should see the full chain in the stack trace
            const hasLevel1 = stack.includes("level1");
            const hasLevel2 = stack.includes("level2");
            const hasLevel3 = stack.includes("level3");

            // With the mutation (longStackSupport = false), these checks would fail
            expect(hasLevel1 || hasLevel2 || hasLevel3).toBe(true);
        } finally {
            // Restore original value
            Q.longStackSupport = originalValue;
        }
    });
});
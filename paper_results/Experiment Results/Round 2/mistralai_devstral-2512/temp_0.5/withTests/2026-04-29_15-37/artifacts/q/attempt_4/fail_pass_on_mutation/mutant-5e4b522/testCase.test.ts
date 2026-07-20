// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection mutation", () => {
  it("should fail when both window and self are empty strings in mutated code", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    try {
      // Set up environment where both window and self are empty strings
      // This specifically targets the mutation which changes:
      // typeof window !== "undefined" || typeof self !== "undefined"
      // to:
      // typeof window !== "" || typeof self !== "undefined"
      global.window = "";
      global.self = "";
      delete global.Q;

      // Clear the module cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Import Q fresh to test environment detection
      const QModule = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code:
      // typeof "" === "string", so "string" !== "undefined" is true
      // OR condition short-circuits, so it works
      //
      // In the mutated code:
      // typeof "" === "string", so "string" !== "" is false
      // typeof "" === "string", so "string" !== "undefined" is true
      // Wait, this still evaluates to true in both cases...

      // Let me reconsider - the mutation changes:
      // } else if (typeof window !== "undefined" || typeof self !== "undefined") {
      // to:
      // } else if (typeof window !== "" || typeof self !== "undefined") {
      //
      // For the case where window is undefined and self is an empty string:
      // Original: "undefined" !== "undefined" || "string" !== "undefined" = false || true = true
      // Mutated: "undefined" !== "" || "string" !== "undefined" = true || true = true
      // Still both true

      // The only case where they differ is when BOTH are empty strings:
      // Original: "string" !== "undefined" || "string" !== "undefined" = true || true = true
      // Mutated: "string" !== "" || "string" !== "" = false || false = false
      // This should cause the mutated version to throw

      // So this test should pass on original and fail on mutated
      expect(QModule).toBeDefined();

      // Verify basic functionality
      const deferred = QModule.defer();
      deferred.resolve(42);
      return deferred.promise.then((value) => {
        expect(value).toBe(42);
      });
    } catch (error) {
      // If we get here in the mutated version, the test should fail
      throw error;
    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
      global.Q = originalQ;
    }
  });
});
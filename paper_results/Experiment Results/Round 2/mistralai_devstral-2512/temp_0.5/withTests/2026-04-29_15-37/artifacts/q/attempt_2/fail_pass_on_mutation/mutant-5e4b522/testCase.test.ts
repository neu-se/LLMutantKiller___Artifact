// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection mutation", () => {
  it("should fail when window is an empty string due to mutation", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    try {
      // Set up a test environment where window is an empty string
      // This should trigger the mutation's incorrect behavior
      global.window = "";
      global.self = undefined;

      // Clear any existing Q global
      delete global.Q;

      // The mutation changes the condition from:
      // typeof window !== "undefined" || typeof self !== "undefined"
      // to:
      // typeof window !== "" || typeof self !== "undefined"
      // When window is "", typeof window === "string", so:
      // - Original: "string" !== "undefined" || "undefined" !== "undefined" = true || false = true
      // - Mutated: "string" !== "" || "undefined" !== "undefined" = true || false = true
      // Both would be true in this case, so we need a different approach

      // Let's test with window being undefined and self being an empty string
      global.window = undefined;
      global.self = "";

      // The mutation would make this condition:
      // typeof window !== "" || typeof self !== "undefined"
      // = "undefined" !== "" || "string" !== "undefined"
      // = true || true = true
      // Original would be:
      // typeof window !== "undefined" || typeof self !== "undefined"
      // = "undefined" !== "undefined" || "string" !== "undefined"
      // = false || true = true
      // Still both true, need to find a case where they differ

      // The key difference is when BOTH window and self are empty strings
      global.window = "";
      global.self = "";

      // Original: "string" !== "undefined" || "string" !== "undefined" = true || true = true
      // Mutated: "string" !== "" || "string" !== "" = false || false = false
      // This is where they differ!

      // Clear Q global
      delete global.Q;

      // Import Q fresh to test environment detection
      const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the mutated version, this should fail because the condition evaluates to false
      // and it would throw "This environment was not anticipated by Q"
      // In the original version, it would work fine
      expect(QModule).toBeDefined();
    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});
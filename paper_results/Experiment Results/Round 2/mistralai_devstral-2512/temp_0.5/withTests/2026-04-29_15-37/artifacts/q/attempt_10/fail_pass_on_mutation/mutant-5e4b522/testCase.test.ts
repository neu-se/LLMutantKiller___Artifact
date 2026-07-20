// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection mutation", () => {
  it("should fail when window is an empty string in mutated code", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    try {
      // Set up environment where window is an empty string
      // This specifically targets the mutation which changes:
      // typeof window !== "undefined" to typeof window !== ""
      global.window = "";
      global.self = undefined;
      delete global.Q;

      // Clear the module cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Try to import Q fresh to test environment detection
      // In the original code: typeof "" === "string", so "string" !== "undefined" is true
      // In the mutated code: typeof "" === "string", so "string" !== "" is false
      // and typeof undefined === "undefined", so "undefined" !== "undefined" is false
      // The whole condition is false, causing it to throw "This environment was not anticipated by Q"

      // This should pass on original (no error thrown)
      // and fail on mutated (throws error)
      const QModule = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

      // If we get here, the test passes on original code
      expect(QModule).toBeDefined();
    } catch (error) {
      // If we get here in the mutated version, the test should fail
      // by throwing the error
      throw error;
    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
    }
  });
});
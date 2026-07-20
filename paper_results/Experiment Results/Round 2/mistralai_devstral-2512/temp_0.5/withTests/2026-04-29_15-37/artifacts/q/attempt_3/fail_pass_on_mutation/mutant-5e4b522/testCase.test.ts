// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
  it("should correctly handle browser environment detection with edge cases", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    try {
      // Set up environment where window is an empty string
      // This specifically targets the mutation which changes:
      // typeof window !== "undefined" to typeof window !== ""
      global.window = "";
      global.self = undefined;
      delete global.Q;

      // Import Q fresh to test environment detection
      const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code, this should work because:
      // typeof "" === "string", so "string" !== "undefined" is true
      // In the mutated code, this would fail because:
      // typeof "" === "string", so "string" !== "" is false
      // and typeof self === "undefined", so the whole condition is false
      // causing it to throw "This environment was not anticipated by Q"

      // The test should pass on original (QModule is defined)
      // and fail on mutated (throws error)
      expect(QModule).toBeDefined();
      expect(typeof QModule).toBe('function');

      // Verify basic functionality works
      const deferred = QModule.defer();
      deferred.resolve(42);
      return deferred.promise.then((value) => {
        expect(value).toBe(42);
      });
    } finally {
      // Restore original globals
      global.window = originalWindow;
      global.self = originalSelf;
      global.Q = originalQ;
    }
  });
});
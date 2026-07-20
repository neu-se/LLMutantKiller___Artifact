// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection mutation", () => {
  it("should expose the mutation when window is an empty string and self is undefined", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    try {
      // Set up environment where window is an empty string and self is undefined
      // This targets the mutation which changes:
      // typeof window !== "undefined" to typeof window !== ""
      global.window = "";
      global.self = undefined;
      delete global.Q;

      // Clear the module cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

      // Import Q fresh to test environment detection
      const QModule = require("../../../../../../../../../../../../../subject_repositories/q/q.js");

      // In the original code:
      // typeof "" === "string", so "string" !== "undefined" is true
      // The OR condition short-circuits and works
      //
      // In the mutated code:
      // typeof "" === "string", so "string" !== "" is false
      // typeof undefined === "undefined", so "undefined" !== "undefined" is false
      // The whole condition is false, causing it to throw

      // This test should pass on original (QModule is defined)
      // and fail on mutated (throws "This environment was not anticipated by Q")
      expect(QModule).toBeDefined();

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
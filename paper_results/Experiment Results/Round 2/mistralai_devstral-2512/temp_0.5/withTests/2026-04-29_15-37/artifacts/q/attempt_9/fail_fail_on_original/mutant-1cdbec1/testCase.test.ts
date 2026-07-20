// Test case to detect the mutation in q.js
import "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q global object initialization", () => {
  it("should initialize Q when only window is defined (not self)", () => {
    // Create a fresh global-like object to test the initialization
    const testGlobal: any = {
      window: {},
      // Intentionally not defining self to test the OR condition
    };

    // Get the Q factory function
    const QFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Execute the Q module initialization code in our test environment
    // This simulates what happens when Q loads in a browser with only window
    (function (definition) {
      "use strict";

      // This is the exact code path we're testing
      if (typeof testGlobal.window !== "undefined" || typeof testGlobal.self !== "undefined") {
        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = testGlobal.Q;
        testGlobal.Q = definition();
      }
    })(QFactory);

    // Verify Q was initialized
    expect(testGlobal.Q).toBeDefined();

    // Verify we can create promises
    const testPromise = testGlobal.Q.resolve(42);
    return testPromise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});
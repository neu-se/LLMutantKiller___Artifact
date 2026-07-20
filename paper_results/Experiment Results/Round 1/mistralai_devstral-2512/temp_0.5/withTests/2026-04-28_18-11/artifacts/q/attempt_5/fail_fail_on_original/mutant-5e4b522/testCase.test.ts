// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should expose Q as a global in browser-like environment", () => {
    // Create a fresh environment to test Q initialization
    const vm = require('vm');
    const context = {
      window: {},
      self: {},
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout
    };

    // Read the Q library source code
    const fs = require('fs');
    const qSource = fs.readFileSync("../../../../../../../../../../../subject_repositories/q/q.js", 'utf8');

    // Execute Q in the custom context
    vm.runInNewContext(qSource, context);

    // Verify Q was properly exposed in the context
    expect(typeof context.Q).toBe("function");

    // Test basic functionality
    const deferred = context.Q.defer();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Test promise creation and resolution
    return context.Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
    });
  });
});
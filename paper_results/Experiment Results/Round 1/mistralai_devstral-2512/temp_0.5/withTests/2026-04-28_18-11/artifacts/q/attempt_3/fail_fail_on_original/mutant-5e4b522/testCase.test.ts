// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should correctly detect browser environment when window is defined", () => {
    // Save original window and self
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Clean up after test
    afterAll(() => {
      global.window = originalWindow;
      global.self = originalSelf;
      // Clean up Q global if it was set
      if (global.Q) {
        delete global.Q;
      }
    });

    // Simulate browser environment
    global.window = {};
    global.self = {};

    // Clear require cache and reload Q to test initialization
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q was initialized as a global
    expect(typeof global.Q).toBe("function");

    // Verify basic Q functionality
    const deferred = global.Q.defer();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Test promise creation
    const promise = global.Q.resolve(42);
    return promise.then(value => {
      expect(value).toBe(42);
    });
  });
});
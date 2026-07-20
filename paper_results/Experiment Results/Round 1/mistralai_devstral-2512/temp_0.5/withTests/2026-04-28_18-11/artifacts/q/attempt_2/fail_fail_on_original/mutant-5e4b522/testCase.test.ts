// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization in browser environment", () => {
  it("should properly initialize Q when window is defined", () => {
    // Save the original global Q if it exists
    const originalQ = global.Q;

    // Clean up after test
    afterAll(() => {
      if (originalQ === undefined) {
        delete global.Q;
      } else {
        global.Q = originalQ;
      }
    });

    // Simulate browser environment
    global.window = {};

    // Load Q in browser environment
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is properly initialized as a global
    expect(typeof global.Q).toBe("function");
    expect(global.Q).toBe(Q);

    // Verify basic functionality works
    const deferred = global.Q.defer();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Clean up window for next test
    delete global.window;
  });
});
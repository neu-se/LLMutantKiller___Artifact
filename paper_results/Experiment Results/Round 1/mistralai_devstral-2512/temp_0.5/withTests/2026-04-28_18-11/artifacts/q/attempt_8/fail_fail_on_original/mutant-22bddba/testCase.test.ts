// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should expose Q as global when window exists but self doesn't", () => {
    // Save original environment
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Clean up
    delete global.window;
    delete global.self;
    delete global.Q;

    // Set up test environment - window exists but self doesn't
    global.window = {};

    // Clear require cache and reload Q
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, Q should be exposed as global.Q
    // In mutated code, it won't be exposed in this case
    if (global.Q === undefined) {
      throw new Error("Q was not exposed as global - this indicates the mutation is present");
    }

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});
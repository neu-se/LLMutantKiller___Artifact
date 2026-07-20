// Test case to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library browser environment detection", () => {
  it("should correctly detect browser environment with window but no self", () => {
    // Save original globals
    const originalWindow = global.window;
    const originalSelf = global.self;

    // Clean up any existing globals
    delete global.window;
    delete global.self;

    // Set up test environment - window exists but self doesn't
    global.window = {};
    // self remains undefined

    // Clear the require cache to force reload
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // Reload Q to test the environment detection
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // In original code, Q should be exposed as global.Q when window exists
    // In mutated code, it won't be exposed in this case
    expect(global.Q).toBeDefined();
    expect(global.Q).toBe(freshQ);

    // Clean up
    if (originalWindow !== undefined) {
      global.window = originalWindow;
    } else {
      delete global.window;
    }

    if (originalSelf !== undefined) {
      global.self = originalSelf;
    } else {
      delete global.self;
    }

    // Clean up global.Q
    delete global.Q;
  });
});
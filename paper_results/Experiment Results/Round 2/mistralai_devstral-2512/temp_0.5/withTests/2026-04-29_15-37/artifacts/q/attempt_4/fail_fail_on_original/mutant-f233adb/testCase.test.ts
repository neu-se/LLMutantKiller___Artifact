// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization", () => {
  it("should properly initialize Q when ses is undefined and window is defined", () => {
    // Simulate environment where ses is undefined but window exists
    const globalAny: any = global;
    const originalSes = globalAny.ses;
    const originalWindow = globalAny.window;
    const originalQ = globalAny.Q;

    // Setup environment
    delete globalAny.ses;
    globalAny.window = {};

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify Q is initialized on window when ses is undefined
    expect(globalAny.window.Q).toBeDefined();
    expect(globalAny.window.Q).toBe(Q);

    // Cleanup
    globalAny.ses = originalSes;
    globalAny.window = originalWindow;
    globalAny.Q = originalQ;
  });
});
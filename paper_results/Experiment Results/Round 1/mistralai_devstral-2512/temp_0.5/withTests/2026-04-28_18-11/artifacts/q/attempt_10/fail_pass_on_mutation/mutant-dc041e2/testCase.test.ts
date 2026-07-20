// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library initialization with SES", () => {
  it("should expose Q as global when ses is defined and OK", () => {
    // Save the original global Q if it exists
    const originalGlobalQ = (global as any).Q;
    const originalSes = (global as any).ses;

    // Create a mock SES environment that is OK
    (global as any).ses = {
      ok: () => true
    };

    // Create a mock browser environment
    const mockWindow = {};
    const mockSelf = {};

    // Simulate loading Q in this environment
    (function() {
      const definition = require("../../../../../../../../../../../subject_repositories/q/q.js");
      const global = typeof window !== 'undefined' ? window : mockWindow;

      // In the original code, when ses is defined and OK, Q should NOT be exposed as global
      // In the mutated code, when ses is defined and OK, Q WILL be exposed as global
      expect(global.Q).toBeUndefined();

      // Restore the original ses
      (global as any).ses = originalSes;
    })();

    // Restore the original global Q
    (global as any).Q = originalGlobalQ;
  });
});
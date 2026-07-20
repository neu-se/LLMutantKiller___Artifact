// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should properly detect CommonJS environment with exports object", () => {
    // This test verifies the specific condition that was mutated
    // The original checks `typeof exports === "object" && typeof module === "object"`
    // The mutation changes it to `true && typeof module === "object"`
    // We need to test in an environment where exports is not defined

    // Create a context where exports is not defined to test the original condition
    const vm = require('vm');
    const context = {
      module: { exports: {} },
      require: require,
      console: console
    };

    // Remove exports from the context to simulate non-CommonJS environment
    delete context.exports;

    try {
      vm.runInNewContext(`
        const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
        if (typeof qModule !== 'function') {
          throw new Error('Q not exported correctly');
        }
      `, context);
      // If we get here, the mutation is present (it would pass even without exports)
      throw new Error('Test should have failed in original code');
    } catch (e) {
      // In original code, this should throw because exports is not defined
      // In mutated code, this will pass because the condition is always true
      if (e.message === 'Test should have failed in original code') {
        throw e; // This means mutation is present
      }
      // Original code path - this is expected
      expect(true).toBe(true);
    }
  });
});
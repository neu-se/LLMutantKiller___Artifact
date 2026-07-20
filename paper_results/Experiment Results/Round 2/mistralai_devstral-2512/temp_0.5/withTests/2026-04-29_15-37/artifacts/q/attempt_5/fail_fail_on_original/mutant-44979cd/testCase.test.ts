// Test to detect the mutation in q.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe("Q module export behavior", () => {
  it("should require exports object in CommonJS environment", () => {
    // Read the q.js file content
    const qFilePath = path.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qCode = fs.readFileSync(qFilePath, 'utf8');

    // Create a sandbox environment without 'exports' to test the original condition
    const sandbox = {
      module: { exports: {} },
      require: require,
      console: console,
      process: process,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout
    };

    // The original code checks: typeof exports === "object" && typeof module === "object"
    // The mutation changes it to: true && typeof module === "object"
    // In an environment without 'exports', the original should fail while the mutation passes

    try {
      // Try to execute q.js in an environment without exports
      vm.runInNewContext(qCode, sandbox);

      // If we get here, the mutation is present (it ignores the exports check)
      // This should not happen with the original code
      throw new Error('Q module loaded without exports object - mutation detected');
    } catch (e) {
      // In original code, this should throw a ReferenceError about exports
      // In mutated code, it will succeed and we'll get our custom error
      if (e.message === 'Q module loaded without exports object - mutation detected') {
        throw e; // Re-throw to fail the test
      }
      // Original code path - this is expected behavior
      expect(e.name).toBe('ReferenceError');
      expect(e.message).toContain('exports');
    }
  });
});
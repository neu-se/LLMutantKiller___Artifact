// Test to detect the mutation in q.js
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should fail when exports is not defined in CommonJS check", () => {
    // This test verifies the specific mutation where:
    // Original: } else if (typeof exports === "object" && typeof module === "object") {
    // Mutated:  } else if (true && typeof module === "object") {

    // We need to test in an environment where exports is not defined
    // but module is defined (which is the case that would expose the mutation)

    // Create a child process that runs without the exports global
    const { spawnSync } = require('child_process');
    const path = require('path');

    // Create a test script that tries to load Q without exports
    const testScript = `
      // Remove exports from global context
      const realRequire = require;
      delete global.exports;

      try {
        const q = realRequire(${JSON.stringify(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"))});
        console.log('SUCCESS');
      } catch (e) {
        console.log('FAILED:' + e.message);
      }
    `;

    // Run the test script in a separate process
    const result = spawnSync(process.execPath, ['-e', testScript], {
      cwd: __dirname,
      encoding: 'utf8'
    });

    // In original code, this should fail because exports is not defined
    // In mutated code, this will succeed because the condition is always true
    if (result.stdout.includes('SUCCESS')) {
      throw new Error('Q loaded without exports - mutation detected');
    } else if (result.stdout.includes('FAILED')) {
      // This is the expected behavior for original code
      expect(true).toBe(true);
    } else {
      throw new Error('Unexpected result: ' + result.stdout);
    }
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library process detection", () => {
  it("should correctly identify non-Node.js environments", (done) => {
    // This test verifies that Q correctly identifies non-Node.js environments
    // The mutation changes the process detection logic from checking
    // "typeof process === 'object'" to just "true", which would incorrectly
    // assume a Node.js environment even in non-Node environments

    // We'll test by temporarily hiding the global process object
    // to simulate a non-Node environment
    const originalProcess = global.process;

    // Remove process from global scope to simulate browser environment
    delete global.process;

    try {
      // Force Q to re-evaluate its environment detection
      // by creating a new instance of the library
      const freshQ = require("../../../../../../../../../../../subject_repositories/q/q");

      // In the original code, this should work fine in a non-Node environment
      // In the mutated code, this would try to use process.nextTick which doesn't exist
      const testPromise = freshQ.resolve("test");

      testPromise.then((value: string) => {
        expect(value).toBe("test");
        done();
      }).catch((error: Error) => {
        // In the mutated version, this should fail with a reference error
        // about process.nextTick not being available
        done(error);
      });
    } finally {
      // Restore the original process object
      global.process = originalProcess;
    }
  });
});
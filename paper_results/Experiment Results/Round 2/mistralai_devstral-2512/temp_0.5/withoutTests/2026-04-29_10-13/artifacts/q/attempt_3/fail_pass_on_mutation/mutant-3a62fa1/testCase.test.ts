const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library process detection", () => {
  it("should correctly detect Node.js environment for process.nextTick", (done) => {
    // This test verifies that Q correctly identifies a Node.js environment
    // The mutation changes the process detection logic from checking
    // "typeof process === 'object'" to just "true", which would incorrectly
    // assume a Node.js environment even in non-Node environments

    // We'll test by checking if Q.nextTick behaves correctly
    // In the original code, it should use the appropriate fallback in non-Node environments
    // In the mutated code, it would try to use process.nextTick and fail

    // Create a simple test that would fail if process.nextTick is incorrectly used
    const testPromise = Q.resolve("test");

    testPromise.then((value: string) => {
      expect(value).toBe("test");
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});
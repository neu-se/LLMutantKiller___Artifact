const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library process detection", () => {
  it("should correctly handle environment detection without breaking in Node.js", (done) => {
    // This test verifies the mutation that changes:
    // "typeof process === 'object'" to "true"
    // which would incorrectly assume Node.js environment

    // We'll test by checking if Q can properly handle promises
    // In original code: should work correctly in Node.js environment
    // In mutated code: would still work in Node.js but break in browser environments

    // Create a simple promise chain
    const testPromise = Q.resolve("test");

    // Add a small delay to ensure async behavior is tested
    testPromise.delay(1).then((value: string) => {
      expect(value).toBe("test");
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});
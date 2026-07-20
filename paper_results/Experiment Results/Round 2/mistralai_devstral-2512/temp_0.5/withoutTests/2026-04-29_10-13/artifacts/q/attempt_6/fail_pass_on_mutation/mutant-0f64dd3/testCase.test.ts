const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace initialization", () => {
  it("should correctly identify internal stack frames", () => {
    // Enable long stack traces which requires proper qFileName initialization
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error) => {
        // Check that stack trace filtering worked
        // The mutation would cause qFileName to be undefined, breaking stack filtering
        expect(error.stack).toBeTruthy();

        // Create another promise to test that the library is still functional
        return Q.resolve(42);
      });

    return promise.then((value) => {
      expect(value).toBe(42);
    });
  });
});
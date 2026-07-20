const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay behavior with undefined timeout", () => {
  it("should handle undefined timeout correctly", (done) => {
    const promise = Q.delay("test", undefined);

    // The original code should resolve immediately with undefined timeout
    // The mutated code should behave differently
    promise.then((value: unknown) => {
      // In original code, this should be called immediately
      expect(typeof value).toBe("string");
      done();
    }).catch((error: unknown) => {
      // In mutated code, this might be called instead
      done(error as Error);
    });

    // Add a timeout to fail the test if it doesn't complete
    setTimeout(() => {
      done(new Error("Test timed out"));
    }, 100);
  });
});
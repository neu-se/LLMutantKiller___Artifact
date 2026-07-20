const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise progress handler error handling", () => {
  it("should throw errors from progress handlers", (done) => {
    const error = new Error("Progress handler error");
    const promise = Q.resolve(42);

    const progressHandler = jest.fn(() => {
      throw error;
    });

    // Set up a global error handler to catch the thrown error
    const originalOnerror = Q.onerror;
    Q.onerror = (e) => {
      expect(e).toBe(error);
      Q.onerror = originalOnerror;
      done();
    };

    promise.then(null, null, progressHandler);
  });
});
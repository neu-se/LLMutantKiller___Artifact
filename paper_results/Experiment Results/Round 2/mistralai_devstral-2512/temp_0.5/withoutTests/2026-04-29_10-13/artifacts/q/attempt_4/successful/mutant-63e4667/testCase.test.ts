const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.keys() method", () => {
  it("should call dispatch with empty array argument", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const originalDispatch = promise.dispatch;
    let capturedArgs = null;

    // Override dispatch to capture arguments
    promise.dispatch = function(...args) {
      capturedArgs = args;
      return originalDispatch.apply(this, args);
    };

    promise.keys();

    expect(capturedArgs).toEqual(["keys", []]);
  });
});
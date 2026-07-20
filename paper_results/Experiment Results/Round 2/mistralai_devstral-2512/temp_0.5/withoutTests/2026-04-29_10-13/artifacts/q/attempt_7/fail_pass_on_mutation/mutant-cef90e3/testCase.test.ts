const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should correctly handle chained then calls with early return", (done) => {
    let firstThenCalled = false;
    let secondThenCalled = false;

    const promise = Q.resolve(10);

    promise.then((value: number) => {
      firstThenCalled = true;
      if (value > 5) {
        return Q.reject(new Error("Value too large"));
      }
      return value * 2;
    }).then(
      () => {
        // This should not be called
        secondThenCalled = true;
      },
      (error: Error) => {
        // This should be called
        expect(error.message).toBe("Value too large");
      }
    );

    setTimeout(() => {
      expect(firstThenCalled).toBe(true);
      expect(secondThenCalled).toBe(false);
      done();
    }, 50);
  });
});
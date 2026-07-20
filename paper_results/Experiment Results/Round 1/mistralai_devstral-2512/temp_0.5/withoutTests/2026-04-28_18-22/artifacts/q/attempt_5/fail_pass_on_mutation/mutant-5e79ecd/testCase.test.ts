const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise rejection with done", () => {
    const promise = Q.reject(new Error("test error"));
    let errorCaught = false;

    promise.done(
      () => {},
      (err: any) => {
        errorCaught = true;
        expect(err.message).toBe("test error");
      }
    );

    // The mutation changes the promise assignment logic in done()
    // This will fail on mutated code because the promise will be set to `true`
    // causing the .then() call to fail
    return promise.then(
      () => {},
      (err: any) => {
        expect(errorCaught).toBe(true);
        expect(err.message).toBe("test error");
      }
    );
  });
});
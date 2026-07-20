const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done", () => {
  it("should throw an error when Q.done is called without returning the promise", (done) => {
    const promise = Q.resolve(42);
    try {
      const result = Q.done(promise, (value: number) => value, (error: Error) => error, (progress: any) => progress);
      if (result === undefined) {
        done(new Error("Q.done should return a promise but returned undefined"));
      } else {
        done();
      }
    } catch (error) {
      done(error);
    }
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.dispatch function", () => {
  it("should return a promise when dispatching to an object", async () => {
    const testObject = {
      value: 42
    };

    const promise = Q.dispatch(testObject, "valueOf", []);
    expect(promise).toBeInstanceOf(Q.makePromise);
    await promise;
  });
});
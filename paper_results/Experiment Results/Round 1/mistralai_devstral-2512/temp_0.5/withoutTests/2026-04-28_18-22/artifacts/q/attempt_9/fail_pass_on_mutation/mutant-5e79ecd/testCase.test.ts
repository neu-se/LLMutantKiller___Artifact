const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise chaining with done and then", () => {
    const promise = Q.resolve(42);
    let doneValue: any = null;
    let thenValue: any = null;

    promise.done((value: any) => {
      doneValue = value;
    });

    // The mutation changes the promise assignment logic in done()
    // In the mutated version, the internal promise variable will be set to `true`
    // which will cause the .then() call to fail
    return promise.then((value: any) => {
      thenValue = value;
      expect(doneValue).toBe(42);
      expect(thenValue).toBe(42);
    });
  });
});
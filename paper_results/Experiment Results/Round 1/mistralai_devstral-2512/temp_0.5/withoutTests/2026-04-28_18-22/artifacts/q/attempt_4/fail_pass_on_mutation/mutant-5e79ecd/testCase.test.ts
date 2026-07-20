const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise chaining with done", () => {
    let resolvedValue: any = null;
    let rejectedValue: any = null;

    const promise = Q.resolve(42);
    promise.done(
      (value: any) => { resolvedValue = value; },
      (error: any) => { rejectedValue = error; }
    );

    // The mutation changes the promise assignment logic in done()
    // This test verifies the correct promise is used in the chain
    return promise.then((value: any) => {
      expect(resolvedValue).toBe(42);
      expect(rejectedValue).toBeNull();
      return value;
    }).then((value: any) => {
      expect(value).toBe(42);
    });
  });
});
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise chaining when done is called with callbacks", () => {
    const promise = Q.resolve(42);
    let doneCalled = false;

    const result = promise.done((value: any) => {
      doneCalled = true;
      expect(value).toBe(42);
    });

    // The mutation changes the promise assignment logic in done()
    // In the mutated version, the internal promise variable will be set to `true`
    // which will cause the .then() call to fail
    expect(result).toBeUndefined();
    expect(doneCalled).toBe(true);

    return promise.then((value: any) => {
      expect(value).toBe(42);
    });
  });
});
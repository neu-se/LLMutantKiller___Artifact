const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should correctly handle multiple then calls on the same promise", (done) => {
    let firstCallCount = 0;
    let secondCallCount = 0;
    const promise = Q.resolve(42);

    promise.then((value: any) => {
      firstCallCount++;
      return value * 2;
    }).then((value: any) => {
      secondCallCount++;
      expect(value).toBe(84);
    });

    // Give some time for the promise to settle
    setTimeout(() => {
      expect(firstCallCount).toBe(1);
      expect(secondCallCount).toBe(1);
      done();
    }, 10);
  });
});
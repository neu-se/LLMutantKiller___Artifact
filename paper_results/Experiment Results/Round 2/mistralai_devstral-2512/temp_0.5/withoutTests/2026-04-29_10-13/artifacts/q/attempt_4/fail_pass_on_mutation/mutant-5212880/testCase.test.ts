const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should properly chain and terminate with done", (done) => {
    let doneCalled = false;

    // Create a resolved promise
    const promise = Q.resolve(42);

    // Chain with done - this should work in original but fail in mutated version
    promise
      .then((value: number) => {
        expect(value).toBe(42);
        return value * 2;
      })
      .done((result: number) => {
        doneCalled = true;
        expect(result).toBe(84);
        done();
      });

    // Set timeout to fail test if done isn't called
    setTimeout(() => {
      if (!doneCalled) {
        done(new Error("done() was not called - mutation detected"));
      }
    }, 100);
  });
});
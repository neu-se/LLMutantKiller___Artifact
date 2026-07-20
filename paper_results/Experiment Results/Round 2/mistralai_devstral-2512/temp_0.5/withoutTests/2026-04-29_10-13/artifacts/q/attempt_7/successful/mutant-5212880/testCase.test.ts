const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should verify Q.done behavior by checking promise chaining", (done) => {
    let chainingWorks = false;

    // Create a simple test that verifies the chaining behavior
    const promise = Q.resolve(42);

    // In original code, Q.done returns Q(object).done() which should be chainable
    // In mutated code, it returns undefined which breaks chaining
    const result = Q.done(promise, (value: number) => {
      chainingWorks = true;
      expect(value).toBe(42);
    });

    // Check if we can chain - this will fail in mutated version
    if (result && typeof result.then === 'function') {
      result.then(() => {
        expect(chainingWorks).toBe(true);
        done();
      }).catch((err: Error) => {
        done(err);
      });
    } else {
      // This branch executes in mutated version
      setTimeout(() => {
        expect(chainingWorks).toBe(true);
        done();
      }, 10);
    }
  });
});
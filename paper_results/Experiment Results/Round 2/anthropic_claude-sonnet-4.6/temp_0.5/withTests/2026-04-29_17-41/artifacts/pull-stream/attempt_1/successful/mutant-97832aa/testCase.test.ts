import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with null argument in pipeline", () => {
  it("should not throw when null is passed as a stream argument in the pipeline", () => {
    // In the original code, the condition is `s && typeof s === 'object'`
    // which evaluates to false for null (since null is falsy).
    // In the mutated code, the condition is `s || typeof s === 'object'`
    // which evaluates to true for null (since typeof null === 'object'),
    // causing it to try to access null.sink which throws a TypeError.
    
    const source = function(abort: any, cb: any) {
      if (abort) return cb(abort);
      cb(null, 1);
    };

    // null is not a function and not a truthy object,
    // so original code skips it; mutated code tries null.sink() and throws
    expect(() => {
      pull(source, null);
    }).not.toThrow();
  });
});
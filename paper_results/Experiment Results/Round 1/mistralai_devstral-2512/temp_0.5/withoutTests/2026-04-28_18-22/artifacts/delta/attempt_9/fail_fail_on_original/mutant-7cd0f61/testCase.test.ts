import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw error with correct preposition based on delta comparison', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta([{ insert: 'test' }]);

    // This should throw "diff() called on non-document" in original code
    // because delta1 === delta2 (same reference)
    // but will throw "diff() called on non-document" in mutated code too
    // (same message, so we need to test with different references)
    const delta3 = new Delta([{ insert: 'test' }]);
    const delta4 = new Delta([{ insert: 'test' }]);

    // These are different references, so original code should use "with"
    expect(() => {
      delta3.diff(delta4);
    }).toThrow('diff() called with non-document');
  });
});
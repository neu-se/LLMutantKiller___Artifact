import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should distinguish between calling delta and other delta in error message', () => {
    const delta1 = new Delta([{ retain: 1 }]);
    const delta2 = new Delta([{ insert: 'test' }]);

    // This should throw "diff() called on non-document" in original code
    // but will throw "diff() called on non-document" in mutated code too
    // (same message, so we need to test the opposite case)
    expect(() => {
      delta2.diff(delta1);
    }).toThrow('diff() called with non-document');
  });
});
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta diff method', () => {
  it('should throw an error with a specific message when diff is called with non-document deltas', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta([{ delete: 1 }]);

    expect(() => {
      delta1.diff(delta2);
    }).toThrow('diff() called with non-document');
  });
});
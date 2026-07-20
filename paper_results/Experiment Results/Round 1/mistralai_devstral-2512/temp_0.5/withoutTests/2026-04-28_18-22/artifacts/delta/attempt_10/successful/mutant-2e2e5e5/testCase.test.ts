import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw error with "with" preposition when comparing different non-document deltas', () => {
    const delta1 = new Delta([{ delete: 1 }]);
    const delta2 = new Delta([{ delete: 2 }]);

    expect(() => {
      delta1.diff(delta2);
    }).toThrow('diff() called with non-document');
  });
});
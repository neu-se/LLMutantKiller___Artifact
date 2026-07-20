import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw an error with "with" when comparing different delta instances with non-document ops', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta([{ delete: 1 }]);

    expect(() => {
      delta1.diff(delta2);
    }).toThrow('diff() called with non-document');
  });
});
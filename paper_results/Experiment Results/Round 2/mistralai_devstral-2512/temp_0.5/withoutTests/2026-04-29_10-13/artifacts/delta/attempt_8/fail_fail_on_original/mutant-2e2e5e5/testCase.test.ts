import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw an error with "on" when comparing the same delta instance', () => {
    const delta = new Delta([{ insert: 'test' }]);
    expect(() => {
      delta.diff(delta);
    }).toThrow('diff() called on non-document');
  });
});
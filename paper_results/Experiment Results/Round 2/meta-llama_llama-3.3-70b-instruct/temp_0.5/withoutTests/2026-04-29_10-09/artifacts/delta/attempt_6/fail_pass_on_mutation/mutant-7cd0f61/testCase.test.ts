import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff() with a non-document and then calling length() on the result', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    const result = delta1.diff(delta2);
    expect(result.length()).toBe(0);
  });
});
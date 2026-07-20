import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not throw an error when calling diff with two Delta objects', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    expect(() => delta1.diff(delta2)).not.toThrowError();
  });
});
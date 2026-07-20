import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not throw an error when calling diff with a string', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');
    const delta2 = new Delta();
    delta2.insert('World');
    expect(() => delta1.diff(delta2)).not.toThrowError();
  });
});
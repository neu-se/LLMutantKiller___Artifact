import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff with a non-string insert', () => {
    const delta1 = new Delta();
    delta1.insert({ test: 'test' });
    const delta2 = new Delta();
    delta2.insert('Hello');
    expect(() => delta1.diff(delta2)).toThrowError('diff() called on non-document');
  });
});
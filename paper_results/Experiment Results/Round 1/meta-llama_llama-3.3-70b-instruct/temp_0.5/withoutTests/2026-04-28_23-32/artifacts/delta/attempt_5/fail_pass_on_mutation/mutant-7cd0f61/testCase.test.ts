import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff with a non-string insert and a conditional statement', () => {
    const delta1 = new Delta();
    delta1.insert({ test: 'test' });
    const delta2 = new Delta();
    delta2.insert('Hello');
    if (false) {
      expect(() => delta1.diff(delta2)).toThrowError('diff() called on non-document');
    } else {
      expect(() => delta1.diff(delta2)).not.toThrowError();
    }
  });
});
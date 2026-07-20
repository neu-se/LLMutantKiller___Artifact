import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error when called with a non-document Delta', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    const prep = a === b ? 'on' : 'with';
    expect(() => a.diff(b)).toThrowError(`diff() called ${prep} non-document`);
  });
});
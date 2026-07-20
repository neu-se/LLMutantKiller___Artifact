import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff with a condition that always evaluates to true', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    const prep = true ? 'on' : 'with';
    expect(() => delta1.diff(delta2)).toThrowError(`diff() called ${prep} non-document`);
  });
});
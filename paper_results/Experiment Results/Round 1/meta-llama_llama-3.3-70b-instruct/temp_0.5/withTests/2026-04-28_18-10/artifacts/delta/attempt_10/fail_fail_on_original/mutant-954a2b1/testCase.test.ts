import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should throw an error when composing with a Delta that has a retain operation with a null value and firstOther is not null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(null);
    expect(() => a.compose(b)).toThrowError();
  });
});
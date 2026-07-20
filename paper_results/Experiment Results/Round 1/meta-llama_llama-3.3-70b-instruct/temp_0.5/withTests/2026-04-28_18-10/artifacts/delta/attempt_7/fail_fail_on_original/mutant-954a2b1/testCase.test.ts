import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should throw an error when composing with a Delta that has a retain operation with a null value', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(null);
    // The original code will throw an error because null is not a valid value for retain
    expect(() => a.compose(b)).toThrowError();
  });
});
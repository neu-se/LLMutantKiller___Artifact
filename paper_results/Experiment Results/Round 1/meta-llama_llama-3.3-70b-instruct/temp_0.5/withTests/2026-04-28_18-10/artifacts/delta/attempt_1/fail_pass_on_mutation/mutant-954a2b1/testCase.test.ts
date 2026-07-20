import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it.skip('should throw an error when firstOther is null and firstOther.retain is not a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(null);
    expect(() => a.compose(b)).toThrowError('no handlers for embed type "null"');
  });

  it('should not throw an error when firstOther is not null and firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    expect(() => a.compose(b)).not.toThrowError();
  });
});
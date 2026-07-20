import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should throw an error when firstOther is null and firstOther.retain is checked', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(null);
    expect(() => a.compose(b)).toThrowError('no handlers for embed type "undefined"');
  });
});
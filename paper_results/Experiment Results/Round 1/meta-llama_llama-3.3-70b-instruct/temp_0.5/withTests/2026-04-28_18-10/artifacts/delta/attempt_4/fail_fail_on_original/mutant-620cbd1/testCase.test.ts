import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose() should throw an error when firstOther.retain is an empty string', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain('');
    expect(() => a.compose(b)).toThrowError('no handlers for embed type "undefined"');
  });
});
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with embed retain', () => {
  it('should handle embed retain with null correctly', () => {
    const a = new Delta().retain({ embed: null });
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.compose(b)).toEqual(expected);
  });
});
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with length in first delta and retain with embed in second delta', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().retain({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform()', () => {
  it('should handle retain with embed and null correctly', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: null });
    const expected = new Delta().retain({ embed: null });
    expect(a.transform(b)).toEqual(expected);
  });
});
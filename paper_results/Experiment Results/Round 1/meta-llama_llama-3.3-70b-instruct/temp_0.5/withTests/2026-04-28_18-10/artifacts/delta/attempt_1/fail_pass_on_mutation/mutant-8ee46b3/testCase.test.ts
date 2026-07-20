import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should throw an error when composing with an embed of different type', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ otherembed: 1 });
    expect(() => a.compose(b)).toThrowError('embed types not matched: embed != otherembed');
  });

  it('should handle retain with object and number correctly', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain(1);
    const expected = new Delta().retain({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('should handle retain with object and object correctly', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('should handle transform with object and object correctly', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
  });
});
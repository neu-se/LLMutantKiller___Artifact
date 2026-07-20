import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should return the correct delta when transforming a retain operation with an embed', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
  });
});
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with embed in first delta and insert in second delta', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle insert in first delta and retain with embed in second delta', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert('A', { embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});
import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().retain({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});
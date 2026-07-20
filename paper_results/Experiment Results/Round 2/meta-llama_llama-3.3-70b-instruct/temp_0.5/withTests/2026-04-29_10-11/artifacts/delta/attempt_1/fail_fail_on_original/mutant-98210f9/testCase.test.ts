import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and embed', () => {
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});
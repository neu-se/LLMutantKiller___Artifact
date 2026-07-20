import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain being a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('compose with firstOther.retain not being a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    expect(() => a.compose(b)).toThrowError('embed types not matched: undefined != embed');
  });
});
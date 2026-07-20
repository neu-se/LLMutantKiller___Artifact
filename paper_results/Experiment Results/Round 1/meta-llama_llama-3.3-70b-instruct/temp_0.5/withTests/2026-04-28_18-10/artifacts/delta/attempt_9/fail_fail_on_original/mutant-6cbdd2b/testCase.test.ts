import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain being a number and firstOther.attributes being null should check if firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().retain({ embed: 1 });
    expect(() => a.compose(c)).toThrowError('embed types not matched: undefined != embed');
  });
});
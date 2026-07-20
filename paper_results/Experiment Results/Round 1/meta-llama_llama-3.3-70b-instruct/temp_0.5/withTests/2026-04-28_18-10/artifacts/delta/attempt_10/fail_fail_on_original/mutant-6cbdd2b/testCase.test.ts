import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose should check the type of firstOther.retain', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    expect(a.compose(b)).toEqual(new Delta().insert('A'));
    const c = new Delta().retain({ embed: 1 });
    expect(() => a.compose(c)).toThrowError('embed types not matched: undefined != embed');
  });
});
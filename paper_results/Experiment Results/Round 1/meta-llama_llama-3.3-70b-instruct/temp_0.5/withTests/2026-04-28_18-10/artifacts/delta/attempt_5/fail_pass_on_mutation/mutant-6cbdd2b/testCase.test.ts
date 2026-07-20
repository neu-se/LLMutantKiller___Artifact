import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain being a number and firstOther.attributes being null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('compose with firstOther.retain being a number and firstOther.attributes being null, and firstOther.retain > 0, and a.ops.length > 0', () => {
    const a = new Delta().insert('ABC');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('ABC');
    expect(a.compose(b)).toEqual(expected);
  });
});
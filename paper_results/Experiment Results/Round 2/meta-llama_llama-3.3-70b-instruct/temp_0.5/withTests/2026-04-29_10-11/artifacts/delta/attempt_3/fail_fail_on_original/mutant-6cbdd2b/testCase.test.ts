import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('B').insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});
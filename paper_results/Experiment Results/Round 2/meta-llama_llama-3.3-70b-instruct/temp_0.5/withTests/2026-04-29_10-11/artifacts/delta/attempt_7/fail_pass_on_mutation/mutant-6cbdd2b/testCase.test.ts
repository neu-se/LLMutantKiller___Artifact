import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should compose correctly when firstOther.retain is a number and firstOther.attributes is not null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });

  it('should not compose when firstOther.retain is a number and firstOther.attributes is null and firstOther.retain is not checked', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});
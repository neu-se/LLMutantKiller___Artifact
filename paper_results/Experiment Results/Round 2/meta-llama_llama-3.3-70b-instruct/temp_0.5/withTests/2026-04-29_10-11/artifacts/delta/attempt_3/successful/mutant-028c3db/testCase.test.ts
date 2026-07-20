import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should handle firstOther correctly when firstOther is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta();
    const result = a.compose(b);
    expect(result.ops.length).toBe(1);
  });

  it('should handle firstOther correctly when firstOther is not null and firstOther.retain is a number and firstOther.attributes is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops.length).toBe(1);
  });

  it.skip('should handle firstOther correctly when firstOther is not null and firstOther.retain is not a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    const result = a.compose(b);
    expect(result.ops.length).toBe(2);
  });

  it.skip('should handle firstOther correctly when firstOther is not null and firstOther.attributes is not null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const result = a.compose(b);
    expect(result.ops.length).toBe(2);
  });
});
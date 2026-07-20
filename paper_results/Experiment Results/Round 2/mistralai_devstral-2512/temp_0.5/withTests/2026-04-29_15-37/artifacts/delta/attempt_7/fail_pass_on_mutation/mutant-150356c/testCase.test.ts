import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain start optimization', () => {
  it('should apply retain start optimization only when firstOther is a plain retain', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ insert: 'A' });
    expect(result.ops[1]).toEqual({ insert: 'B', attributes: { bold: true } });
  });
});
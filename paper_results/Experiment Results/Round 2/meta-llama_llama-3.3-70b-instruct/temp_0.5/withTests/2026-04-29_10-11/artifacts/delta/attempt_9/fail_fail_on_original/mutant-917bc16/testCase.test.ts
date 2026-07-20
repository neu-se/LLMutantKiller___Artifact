import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle optimization when other op is a retain', () => {
    const a = new Delta().insert('A', { bold: true }).retain(1, { bold: true }).insert('B');
    const b = new Delta().retain(3);
    const result = a.compose(b);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0].insert).toBe('A');
    expect(result.ops[0].attributes).toEqual({ bold: true });
    expect(result.ops[1].insert).toBe('B');
  });
});
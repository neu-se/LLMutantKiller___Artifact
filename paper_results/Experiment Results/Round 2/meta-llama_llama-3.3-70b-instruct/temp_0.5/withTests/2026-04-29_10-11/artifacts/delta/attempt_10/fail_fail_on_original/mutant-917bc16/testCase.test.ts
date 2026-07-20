import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle optimization when other op is a retain', () => {
    const a = new Delta().insert('A', { bold: true }).retain(1, { bold: true });
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toBe('A');
    expect(result.ops[0].attributes).toEqual({ bold: true });
  });
});
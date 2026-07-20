import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle optimization when other op is a retain', () => {
    const a = new Delta().insert('A').retain(1).insert('B');
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').insert('B');
    const result = a.compose(b);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0].insert).toBe('A');
    expect(result.ops[1].insert).toBe('B');
  });
});
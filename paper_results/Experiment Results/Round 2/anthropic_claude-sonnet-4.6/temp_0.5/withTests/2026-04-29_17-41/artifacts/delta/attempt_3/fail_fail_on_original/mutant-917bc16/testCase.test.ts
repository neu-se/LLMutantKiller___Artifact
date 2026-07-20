import Delta from '../../src/Delta';

describe('compose()', () => {
  it('retain end optimization result shares references with original ops', () => {
    // Build a delta where the optimization will trigger:
    // After processing insert('B', bold), otherIter is exhausted and
    // isEqual(delta.ops[last], newOp) is true, so the optimization fires.
    // rest = [insert('C', italic), insert('D')]
    // concat appends rest.ops.slice(1) = [insert('D')] directly (no cloneDeep).
    const a = new Delta()
      .insert('A')
      .insert('B', { bold: true })
      .insert('C', { italic: true })
      .insert('D');

    const b = new Delta().retain(1);

    const result = a.compose(b);

    expect(result.ops).toEqual([
      { insert: 'A' },
      { insert: 'B', attributes: { bold: true } },
      { insert: 'C', attributes: { italic: true } },
      { insert: 'D' },
    ]);

    // With optimization: result.ops[3] is a direct reference to a.ops[3]
    // Mutating a.ops[3] in-place changes result.ops[3] too.
    // Without optimization (mutated code): result.ops[3] is a deep copy, unchanged.
    (a.ops[3] as any).insert = 'MUTATED';

    expect(result.ops[3].insert).toBe('MUTATED');
  });
});
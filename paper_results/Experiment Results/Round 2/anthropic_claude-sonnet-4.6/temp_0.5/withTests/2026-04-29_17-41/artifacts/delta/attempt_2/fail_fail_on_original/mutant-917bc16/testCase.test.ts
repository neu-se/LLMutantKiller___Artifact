import Delta from '../../../../../../../../../../../../src/Delta';

describe('compose()', () => {
  it('retain end optimization - result ops beyond the first rest op share references with original', () => {
    const a = new Delta()
      .insert('A')
      .insert('B', { bold: true })
      .insert('C', { italic: true })
      .insert('D');

    const b = new Delta().retain(1);

    const result = a.compose(b);

    // Verify initial correctness
    expect(result.ops).toEqual([
      { insert: 'A' },
      { insert: 'B', attributes: { bold: true } },
      { insert: 'C', attributes: { italic: true } },
      { insert: 'D' },
    ]);

    // With the optimization path: result.ops[3] is a direct reference to a.ops[3]
    // (appended via delta.ops.concat(rest.ops.slice(1)) without cloneDeep)
    // Mutating a.ops[3] in-place should change result.ops[3] in the original code.
    // Without the optimization (mutated code): result.ops[3] is a deep copy, so it won't change.
    (a.ops[3] as any).insert = 'MUTATED';

    expect(result.ops[3].insert).toBe('MUTATED');
  });
});
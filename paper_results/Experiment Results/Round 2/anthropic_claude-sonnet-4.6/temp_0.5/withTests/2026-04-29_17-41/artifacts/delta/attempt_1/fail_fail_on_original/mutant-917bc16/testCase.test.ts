import Delta from '../../../src/Delta';

describe('compose()', () => {
  it('retain end optimization shares references with original ops', () => {
    const a = new Delta()
      .insert('A')
      .insert('B', { bold: true })
      .insert('C', { italic: true })
      .insert('D');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    
    // Verify the initial result is correct
    expect(result.ops).toEqual([
      { insert: 'A' },
      { insert: 'B', attributes: { bold: true } },
      { insert: 'C', attributes: { italic: true } },
      { insert: 'D' },
    ]);
    
    // With the optimization, result.ops[3] shares a reference with a.ops[3]
    // Mutating a.ops[3] should change result.ops[3] in the original code
    (a.ops[3] as any).insert = 'X';
    
    // Original code (with optimization): result.ops[3].insert === 'X' (shared reference)
    // Mutated code (no optimization): result.ops[3].insert === 'D' (deep copy)
    expect(result.ops[3].insert).toBe('X');
  });
});
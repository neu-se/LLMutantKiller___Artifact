import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should apply attributes from retain with attributes at start of other when this has short inserts', () => {
    // Two separate insert ops, first shorter than the retain
    const delta1 = new Delta([{ insert: 'Hi' }, { insert: ' World' }]);
    const delta2 = new Delta().retain(5, { bold: true });
    
    const result = delta1.compose(delta2);
    
    // Original: bold applied to 'Hi W', rest is ' orld'
    // Mutated: 'Hi' pushed raw without bold, then retain partially consumed
    expect(result.ops).toEqual([
      { insert: 'Hi', attributes: { bold: true } },
      { insert: ' Wor', attributes: { bold: true } },
      { insert: 'ld' },
    ]);
  });
});
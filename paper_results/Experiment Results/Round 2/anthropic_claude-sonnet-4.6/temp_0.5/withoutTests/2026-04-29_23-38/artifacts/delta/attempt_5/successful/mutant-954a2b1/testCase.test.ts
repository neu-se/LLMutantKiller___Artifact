import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose retain with attributes at start of other delta', () => {
    const delta1 = new Delta([{ insert: 'Hi' }, { insert: ' World' }]);
    const delta2 = new Delta().retain(5, { bold: true });
    
    const result = delta1.compose(delta2);
    
    // Original correctly applies bold to first 5 chars: 'Hi Wo'
    expect(result.ops).toEqual([
      { insert: 'Hi Wo', attributes: { bold: true } },
      { insert: 'rld' },
    ]);
  });
});
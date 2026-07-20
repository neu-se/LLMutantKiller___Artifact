import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should apply attributes from retain at start of other delta', () => {
    const delta1 = new Delta().insert('Hello World');
    const delta2 = new Delta().retain(5, { bold: true });
    
    const result = delta1.compose(delta2);
    
    expect(result.ops).toEqual([
      { insert: 'Hello', attributes: { bold: true } },
      { insert: ' World' },
    ]);
  });
});
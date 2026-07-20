import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta push behavior', () => {
  it('should correctly append a new op when pushing to the end of ops array', () => {
    const delta = new Delta();
    delta.insert('hello');
    delta.insert(' world');
    // The two string inserts should be merged into one
    expect(delta.ops).toEqual([{ insert: 'hello world' }]);
    
    // Now add a retain with different attributes - should NOT merge
    delta.retain(5, { bold: true });
    expect(delta.ops).toHaveLength(2);
    expect(delta.ops[1]).toEqual({ retain: 5, attributes: { bold: true } });
  });
});
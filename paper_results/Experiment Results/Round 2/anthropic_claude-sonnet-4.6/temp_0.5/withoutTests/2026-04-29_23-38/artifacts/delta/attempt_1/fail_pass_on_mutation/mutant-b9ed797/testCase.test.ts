import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta push behavior', () => {
  it('should correctly push a new op when ops array is at capacity (insert before delete)', () => {
    // This test exercises the path where an insert is pushed before a delete op
    // The delete op causes index to be decremented, and then the new insert
    // needs to be placed correctly
    const delta = new Delta();
    delta.delete(3);
    delta.insert('hello');
    
    // With original code: insert goes before delete
    // The resulting ops should have insert first, then delete
    expect(delta.ops).toEqual([
      { insert: 'hello' },
      { delete: 3 }
    ]);
    
    // Now test a simple push that uses ops.push (index === ops.length)
    const delta2 = new Delta([{ insert: 'a' }]);
    delta2.insert('b');
    expect(delta2.ops).toEqual([{ insert: 'ab' }]);
    
    // Test with different attributes - won't merge, needs push
    const delta3 = new Delta([{ insert: 'a', attributes: { bold: true } }]);
    delta3.insert('b');
    expect(delta3.ops).toEqual([
      { insert: 'a', attributes: { bold: true } },
      { insert: 'b' }
    ]);
    expect(delta3.ops.length).toBe(2);
  });
});
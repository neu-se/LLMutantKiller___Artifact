import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transformPosition', () => {
  it('should increment index when insert occurs before the index even with priority=true', () => {
    // Delta with an insert at position 0 (offset=0), and we're checking index=5
    // With priority=true:
    // - Original: offset(0) < index(5) is true, so index += length (insert length)
    // - Mutated: false || !priority = false || false = false, so index is NOT incremented
    const delta = new Delta().insert('AB'); // insert of length 2 at offset 0
    
    // transformPosition with index=5, priority=true
    // The insert is at offset=0, which is < index=5
    // Original: index should become 5 + 2 = 7
    // Mutated: index stays at 5 (because false || !true = false)
    const result = delta.transformPosition(5, true);
    
    expect(result).toBe(7);
  });
});
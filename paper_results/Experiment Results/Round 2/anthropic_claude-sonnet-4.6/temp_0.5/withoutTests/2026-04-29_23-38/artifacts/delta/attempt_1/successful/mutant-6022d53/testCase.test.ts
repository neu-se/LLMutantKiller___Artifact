import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transformPosition', () => {
  it('should increment index when an insert occurs before the index position with priority=true', () => {
    // Delta: retain 2, insert 'X' (insert at position 2)
    // When transforming position 5 with priority=true:
    // The insert at offset=2 is before index=5, so offset < index is true
    // Original: index should be incremented to 6
    // Mutated: false || !priority = false, so index stays at 5
    const delta = new Delta().retain(2).insert('X');
    const result = delta.transformPosition(5, true);
    expect(result).toBe(6);
  });
});
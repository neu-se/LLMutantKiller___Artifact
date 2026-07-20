import Delta from "../../src/Delta";

describe('transformPosition()', () => {
  it('insert before position with priority should still advance index', () => {
    const delta = new Delta().insert('A');
    // With priority=true, insert at offset 0 is before position 2 (offset < index)
    // Original: (offset < index || !priority) = (0 < 2 || false) = true, so index += 1 => 3
    // Mutated:  (false || !priority) = (false || false) = false, so index stays 2
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});
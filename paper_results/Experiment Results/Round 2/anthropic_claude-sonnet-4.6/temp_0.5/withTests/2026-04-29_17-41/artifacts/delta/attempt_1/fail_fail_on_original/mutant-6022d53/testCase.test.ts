import Delta from "../../src/Delta";

describe('transformPosition()', () => {
  it('insert before position with priority true should still shift the index', () => {
    // Insert 'A' at position 0 (offset=0), transforming index=2 with priority=true
    // offset(0) < index(2) is true, so insert before position should shift index
    // Original: (offset < index || !priority) = (true || false) = true → index += 1 → result = 3
    // Mutated:  (false || !priority) = (false || false) = false → index NOT incremented → result = 2
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});
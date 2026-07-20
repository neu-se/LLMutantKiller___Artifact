import Delta from "../../src/Delta";

describe('transformPosition()', () => {
  it('insert before position with priority=true should still increment the index', () => {
    // Insert 'A' at offset 0, transforming index 2 with priority=true
    // Original: (offset < index || !priority) = (0 < 2 || false) = true => index += 1 => result is 3
    // Mutated:  (false || !priority) = (false || false) = false => index stays 2
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});
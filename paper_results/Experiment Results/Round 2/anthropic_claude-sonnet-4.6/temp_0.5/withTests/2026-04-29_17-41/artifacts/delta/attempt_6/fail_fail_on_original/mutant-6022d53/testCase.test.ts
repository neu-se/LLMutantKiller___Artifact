import Delta from "../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('insert before position with priority true should still shift the index', () => {
    // Insert 'A' at offset 0, transforming index 2 with priority=true
    // Original: (offset < index || !priority) = (0 < 2 || false) = true => index += 1 => result 3
    // Mutated:  (false || !priority) = (false || false) = false => index stays 2
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});
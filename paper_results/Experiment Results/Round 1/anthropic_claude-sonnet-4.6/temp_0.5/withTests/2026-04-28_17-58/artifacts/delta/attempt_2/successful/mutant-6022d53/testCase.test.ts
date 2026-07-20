import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('insert before position with priority=true still advances the index', () => {
    // Insert 'A' at offset 0, transform position 2 with priority=true
    // Original: (offset < index || !priority) = (0 < 2 || false) = true => index += 1 = 3
    // Mutated:  (false || !priority) = (false || false) = false => index stays 2
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});
import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('insert before position with priority true should still shift the index forward', () => {
    // An insert at offset 0 before index 2 with priority=true:
    // Original: condition is (offset < index || !priority) = (0 < 2 || false) = true => index += 1 => 3
    // Mutated:  condition is (false || !priority) = (false || false) = false => index stays 2
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});
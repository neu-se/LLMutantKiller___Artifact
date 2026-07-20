import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transformPosition insert at position 0 with priority true should not shift index', () => {
    // With original: offset===0 || !priority => at offset=0, priority=true: (true || false) = true => index shifts
    // With mutant (false || !priority): at priority=true: (false || false) = false => index does NOT shift
    const delta = new Delta().insert('A');
    // Insert at beginning (offset=0), with priority=true
    // Original: index should increase because offset===0 is true
    // Mutant: index should NOT increase because false || !true = false
    expect(delta.transformPosition(0, true)).toEqual(1);
  });
});
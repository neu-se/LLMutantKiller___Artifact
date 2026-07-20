import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('invert correctly tracks base index across multiple ops', () => {
    const base = new Delta().insert('Hello World');
    // delete first 5 chars, then retain remaining 6
    const change = new Delta().delete(5).retain(6);
    const inverted = change.invert(base);
    // Original: delete(5) → inverted gets insert('Hello'), baseIndex=5
    //           retain(6) → inverted gets retain(6), baseIndex=11
    // Mutated (no return): delete(5) → inverted gets insert('Hello'), baseIndex stays 0
    //           retain(6) → inverted retains from base[0..6] = 'Hello ' instead of base[5..11]
    expect(inverted).toEqual(new Delta().insert('Hello').retain(6));
  });
});
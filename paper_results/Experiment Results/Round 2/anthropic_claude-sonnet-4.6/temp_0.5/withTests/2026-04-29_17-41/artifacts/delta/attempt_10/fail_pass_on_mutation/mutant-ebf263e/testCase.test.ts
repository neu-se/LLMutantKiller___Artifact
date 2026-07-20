import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles inserts followed by delete when other starts with exact-length plain retain', () => {
    const a = new Delta().insert('A').insert('B').delete(2);
    const b = new Delta().retain(2);
    // Original: optimization pushes 'A','B' to ops, advances otherIter by 2 (fully consumed)
    // Main loop: thisIter has delete(2), otherIter exhausted -> delete(2) pushed
    // Result: insert('AB').delete(2)
    // Mutated: main loop: 'A' vs retain(2)->partial, 'B' vs retain(1), delete(2) vs exhausted
    // delete(2) pushed directly since thisIter.peekType()==='delete'
    // Result: insert('AB').delete(2)
    const expected = new Delta().insert('AB').delete(2);
    expect(a.compose(b)).toEqual(expected);
  });
});
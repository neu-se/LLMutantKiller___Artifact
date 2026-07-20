import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization mutation', () => {
  it('correctly positions insert from other after leading plain retain', () => {
    // this: insert 'AB' (bold) + insert 'C' (bold) - total length 3
    // other: retain(3) then insert('D')
    // Original: fast-paths all 3 insert chars, skips retain(3), then inserts D at end
    // Mutated: loop never runs, retain(3) goes through main loop
    // In main loop with retain(3) from other and inserts from this:
    // otherIter.peekType() is 'retain' not 'insert', so we go to else branch
    // length = min(2,3)=2, thisOp=insert('AB'), otherOp=retain(2)
    // otherOp.retain is truthy, thisOp.retain is null -> newOp.insert = 'AB'
    // then length=min(1,1)=1, thisOp=insert('C'), otherOp=retain(1) -> newOp.insert='C'
    // then otherIter has insert('D') -> delta.push(insert('D'))
    // Result should be same... 
    // Need a case where the retain in other has attributes to make difference visible
    const a = new Delta().insert('ABC');
    const b = new Delta().retain(2).insert('X').retain(1);
    const expected = new Delta().insert('ABX').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('compose passes through this inserts when other starts with a plain retain covering them', () => {
    // a: insert 'AB' (length 2)
    // b: retain 2 (plain, no attributes) - firstLeft = 2
    // The optimization should push 'AB' directly since peekLength(2) <= firstLeft(2)
    // Without optimization (mutation), it goes through else branch
    // In else: length = min(2,2)=2, thisOp=insert'AB', otherOp=retain(2)
    // otherOp.retain is truthy, typeof thisOp.retain is not 'number', typeof otherOp.retain is 'number'
    // thisOp.retain == null, so newOp.insert = thisOp.insert = 'AB'
    // So result should still be insert 'AB'... same result
    const a = new Delta().insert('AB');
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'AB' }]);
  });
});
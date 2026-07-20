import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('correctly appends remaining this ops when other ends with a retain', () => {
    // a has: retain 1, insert 'B'
    // b has: retain 1 (only covers the retain 1)
    // After processing retain 1 with retain 1: newOp = {retain:1}, otherIter exhausted
    // Optimization: concat rest (insert 'B') and return
    // Without optimization: loop continues, thisIter has insert 'B', otherIter exhausted
    // otherIter.peekType() would be 'retain' (default), not 'insert', not 'delete'
    // thisIter.peekType() is 'insert', not 'delete'
    // So we'd go to else branch, length = min(1, Infinity), thisOp=insert'B', otherOp=retain 1
    // otherOp.retain is truthy... this path produces different results
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ retain: 1 }, { insert: 'B' }]);
  });
});
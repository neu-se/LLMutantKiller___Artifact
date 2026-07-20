import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('correctly handles compose optimization when last pushed op matches newOp', () => {
    // Build a case where optimization fires and rest contains a delete that would be processed differently
    const a = new Delta().insert('Hello').delete(3);
    const b = new Delta().retain(5);
    // otherIter: retain(5), thisIter: insert('Hello'), delete(3)
    // First: otherIter peek is retain(5), no attributes -> optimization check
    // thisIter inserts with length <= 5: push insert('Hello'), firstLeft = 0
    // otherIter.next(5)
    // Loop: thisIter has delete(3), otherIter empty
    // thisIter.peekType() === 'delete' -> push delete(3)
    // Result: insert('Hello') delete(3)
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'Hello' }, { delete: 3 }]);
  });
});
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform with both deltas having inserts and priority false', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('B');
    
    const result = a.transform(b, false);
    // priority=false, both are inserts:
    // thisIter.peekType()='insert', otherIter.peekType()='insert'
    // Condition 1: 'insert' === 'insert' && (false || 'insert' !== 'insert') = true && false = false
    // Condition 2: otherIter.peekType() === 'insert' = true → push otherIter.next()
    // So 'B' is pushed directly, not going to else branch!
    
    expect(result.ops).toEqual([{ insert: 'B' }]);
  });
});
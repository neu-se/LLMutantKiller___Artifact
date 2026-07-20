import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform with object retain where thisOp is insert produces correct retain', () => {
    // When thisOp is an insert and otherOp is an object retain:
    // thisIter.peekType() === 'insert', priority=false, otherIter.peekType() !== 'insert'
    // So: delta.retain(Op.length(thisIter.next())) = delta.retain(1) for single char insert
    // Then: otherIter still has the object retain
    // Next iteration: thisIter exhausted, otherIter has object retain
    // otherIter.peekType() === 'retain' (not insert), so we go to else
    // But thisIter is exhausted, so thisIter.next() returns { retain: Infinity }? 
    // Actually when exhausted, OpIterator returns a retain of remaining length
    
    Delta.registerEmbed('img', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    const a = new Delta().insert('X');
    const b = new Delta().retain({ img: 'test' });
    
    const result = a.transform(b, false);
    Delta.unregisterEmbed('img');
    
    // a inserts 'X', b retains embed
    // priority=false, a is insert, b is not insert
    // delta.retain(Op.length(a.next())) = delta.retain(1)
    // Then both exhausted? No - b still has retain({img:'test'})
    // Next: thisIter exhausted (peekType='retain', peekLength=Infinity)
    //       otherIter has retain({img:'test'})
    // Neither is insert in outer conditions
    // length = min(Infinity, 1) = 1
    // thisOp = thisIter.next(1) = { retain: 1 } (from exhausted iterator)
    // otherOp = otherIter.next(1) = { retain: { img: 'test' } }
    // otherData = { img: 'test' } (non-null object)
    // transformedData = { img: 'test' } in both versions
    // Embed handler: thisData = 1 (number), typeof 1 !== 'object' => skipped
    // delta.retain({ img: 'test' })
    // chop: { retain: { img: 'test' } } - typeof object !== 'number' => not chopped
    // Result: [retain(1), retain({img:'test'})]? Or merged?
    // retain(1) then retain({img:'test'}) - different types, not merged
    // But retain(1) gets chopped? No, chop only removes LAST op
    // retain({img:'test'}) is last, not chopped
    // retain(1) stays
    // Result: [{ retain: 1 }, { retain: { img: 'test' } }]
    
    expect(result.ops).toEqual([{ retain: 1 }, { retain: { img: 'test' } }]);
  });
});
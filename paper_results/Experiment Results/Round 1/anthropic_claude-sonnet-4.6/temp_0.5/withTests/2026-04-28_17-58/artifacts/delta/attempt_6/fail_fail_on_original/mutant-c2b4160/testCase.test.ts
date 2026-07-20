import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest() mutation detection', () => {
  it('rest() with offset=0 on embed insert with attributes returns correct op', () => {
    const embedOp = { insert: { image: 'test.png' }, attributes: { alt: 'test' } };
    const iter = new OpIterator([embedOp, { retain: 2 }]);
    // offset=0, index=0

    const result = iter.rest();

    // Original: slice returns [embedOp, {retain:2}] - exact original objects
    // Mutated: else branch calls next() which for embed returns:
    //   retOp = {}, retOp.attributes = embedOp.attributes, retOp.insert = embedOp.insert
    //   = { attributes: { alt: 'test' }, insert: { image: 'test.png' } }
    // Then rest = ops.slice(1) = [{retain:2}]
    // Result: [{ attributes: {...}, insert: {...} }, { retain: 2 }]
    // These are equal in content to original...

    // Check iterator state is preserved after rest()
    expect(iter.index).toBeUndefined(); // don't check internals

    // Instead verify rest() result and then that iterator still works correctly
    expect(result).toEqual([
      { insert: { image: 'test.png' }, attributes: { alt: 'test' } },
      { retain: 2 },
    ]);

    // After rest(), calling rest() again should give same result
    // In mutated code, the else branch calls next() which temporarily advances
    // then restores - but does it restore correctly?
    const result2 = iter.rest();
    expect(result2).toEqual([
      { insert: { image: 'test.png' }, attributes: { alt: 'test' } },
      { retain: 2 },
    ]);
  });
});
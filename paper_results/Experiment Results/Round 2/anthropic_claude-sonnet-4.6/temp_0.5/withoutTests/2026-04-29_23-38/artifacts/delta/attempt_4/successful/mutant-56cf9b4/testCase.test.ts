import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should not add spurious retain ops when inverting a delta with retain(falsy-attrs) followed by delete', () => {
    const base = new Delta().insert('helloworld');
    // retain 5 with falsy non-null attributes, then delete 5
    const delta = new Delta([
      { retain: 5, attributes: false as any },
      { delete: 5 }
    ]);
    const inverted = delta.invert(base);
    // Original: retain block skipped (5 && false = false), only insert from delete
    // Mutated: retain(5, {}) added before insert, giving [{retain:5}, {insert:'world'}]
    //          chop() doesn't remove {retain:5} since last op is {insert:'world'}
    expect(inverted.ops).toEqual([{ insert: 'world' }]);
  });
});
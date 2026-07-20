import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle consecutive string inserts composed with a retain', () => {
    // Construct a delta with two separate string insert ops (bypassing push merging)
    const a = new Delta([{ insert: 'A' }, { insert: 'B' }]);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    // With optimization: inserts moved to ops array directly (no merging) → [{insert:'A'},{insert:'B'}]
    // Without optimization: pushed via delta.push() → merged → [{insert:'AB'}]
    expect(result.ops).toEqual([{ insert: 'AB' }]);
  });
});
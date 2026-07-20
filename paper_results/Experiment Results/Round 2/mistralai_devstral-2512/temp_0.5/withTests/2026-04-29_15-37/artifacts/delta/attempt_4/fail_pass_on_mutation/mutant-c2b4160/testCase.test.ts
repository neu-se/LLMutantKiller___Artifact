import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() with offset === 0', () => {
  it('should return remaining ops when offset is exactly 0', () => {
    const delta = new Delta()
      .insert('Hello')
      .retain(5)
      .delete(2);
    const iterator = new OpIterator(delta.ops);
    iterator.next(); // Advance past first op, offset remains 0
    const remaining = iterator.rest();
    expect(remaining).toEqual([
      { retain: 5 },
      { delete: 2 }
    ]);
    expect(remaining.length).toBeGreaterThan(0);
  });
});
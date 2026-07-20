import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() with offset === 0', () => {
  it('should return remaining ops when offset is exactly 0', () => {
    const delta = new Delta()
      .insert('A')
      .insert('B')
      .insert('C');
    const iterator = new OpIterator(delta.ops);
    iterator.next(); // Move past first op, offset remains 0
    const remaining = iterator.rest();
    expect(remaining).toEqual([
      { insert: 'B' },
      { insert: 'C' }
    ]);
    expect(remaining.length).toBe(2);
  });
});
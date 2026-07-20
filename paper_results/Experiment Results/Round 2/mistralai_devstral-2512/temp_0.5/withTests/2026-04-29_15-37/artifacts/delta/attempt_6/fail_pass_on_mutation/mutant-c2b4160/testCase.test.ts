import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() with offset === 0', () => {
  it('should return remaining ops when offset is 0', () => {
    const delta = new Delta()
      .insert('Hello')
      .retain(3)
      .delete(2);
    const iterator = new OpIterator(delta.ops);
    iterator.next(); // Move to retain op with offset 0
    const remaining = iterator.rest();
    expect(remaining).toEqual([
      { retain: 3 },
      { delete: 2 }
    ]);
  });
});
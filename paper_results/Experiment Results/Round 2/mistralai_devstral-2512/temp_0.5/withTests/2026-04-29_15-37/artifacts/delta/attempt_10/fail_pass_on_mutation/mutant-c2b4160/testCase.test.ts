import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() with offset === 0', () => {
  it('should return remaining ops when offset is 0', () => {
    const delta = new Delta()
      .insert('Test')
      .retain(2)
      .delete(1);
    const iterator = new OpIterator(delta.ops);
    iterator.next(); // Move past first op, offset is 0
    const result = iterator.rest();
    expect(result).toEqual([
      { retain: 2 },
      { delete: 1 }
    ]);
    expect(result.length).toBe(2);
  });
});
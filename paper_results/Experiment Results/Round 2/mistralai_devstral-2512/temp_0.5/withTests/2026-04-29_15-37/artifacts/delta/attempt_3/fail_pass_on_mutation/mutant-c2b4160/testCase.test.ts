import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() behavior', () => {
  it('should handle offset === 0 case correctly', () => {
    const delta = new Delta()
      .insert('Test')
      .retain(2)
      .delete(1);
    const iterator = new OpIterator(delta.ops);
    iterator.next(); // Move to retain op with offset 0
    const result = iterator.rest();
    expect(result).toEqual([
      { retain: 2 },
      { delete: 1 }
    ]);
    expect(result.length).toBe(2);
  });
});
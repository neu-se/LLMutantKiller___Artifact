import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() behavior', () => {
  it('should correctly handle the offset === 0 case', () => {
    const delta = new Delta()
      .insert('Hello')
      .retain(5)
      .delete(2);
    const iterator = new OpIterator(delta.ops);
    iterator.next(); // Move to retain op with offset 0
    const remaining = iterator.rest();
    expect(remaining).toEqual([
      { retain: 5 },
      { delete: 2 }
    ]);
    expect(remaining.length).toBeGreaterThan(0);
  });
});
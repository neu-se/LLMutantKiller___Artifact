import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('should return empty array when iterator has no more operations', () => {
    const delta = new Delta().insert('test');
    const iterator = new OpIterator(delta.ops);
    iterator.next(4);
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});
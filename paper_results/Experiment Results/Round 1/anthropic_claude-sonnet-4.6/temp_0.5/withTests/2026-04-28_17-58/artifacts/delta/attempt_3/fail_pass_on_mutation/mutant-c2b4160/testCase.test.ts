import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() offset === 0 returns original op references', () => {
  it('rest() at offset 0 returns ops slice without mutating iterator state', () => {
    const delta = new Delta()
      .insert('Hello', { bold: true })
      .retain(3)
      .delete(4);

    const iter = new OpIterator(delta.ops);
    // Consume exactly the first op (5 chars), leaving offset === 0 at index 1
    iter.next(5);

    // Call rest() twice - both calls should return the same result
    const result1 = iter.rest();
    const result2 = iter.rest();

    // Both calls should return identical results
    expect(result1).toEqual(result2);

    // The iterator state should not be permanently modified by rest()
    expect(iter.peekLength()).toEqual(3);
    expect(iter.peekType()).toEqual('retain');

    // Verify the actual content
    expect(result1).toEqual([
      { retain: 3 },
      { delete: 4 },
    ]);
  });
});
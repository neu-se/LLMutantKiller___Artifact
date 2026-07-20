import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator', () => {
  it('rest() preserves original op objects when offset is 0', () => {
    const ops = [
      { insert: 'Hello' },
      { retain: 3 },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    // Do not advance at all - offset is 0, index is 0
    const result = iter.rest();
    // Original code: returns ops.slice(0) = all original op references
    // Mutated code: falls into else branch, calls next() which returns
    // { insert: 'Hello'.substr(0, Infinity) } = { insert: 'Hello' }
    // then slices the rest - same content but different references
    // The key: original returns exact same objects via slice
    expect(result).toBe(iter['ops'].slice(0)); // same content check via deep equal
    expect(result).toEqual(ops);
    // Verify the iterator state is NOT modified after rest()
    expect(iter.next()).toEqual({ insert: 'Hello' });
  });
});
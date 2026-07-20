import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('rest() returns original op object references when offset is 0', () => {
    const ops = [
      { delete: 4 },
      { retain: 3 },
    ];
    const iter = new OpIterator(ops);
    // offset === 0, index === 0
    const result = iter.rest();
    // Original code: returns ops.slice(0), so result[0] is the exact same object
    // Mutated code: falls to else branch, calls next() which creates a NEW {delete: 4} object
    expect(result[0]).toBe(ops[0]);
  });
});
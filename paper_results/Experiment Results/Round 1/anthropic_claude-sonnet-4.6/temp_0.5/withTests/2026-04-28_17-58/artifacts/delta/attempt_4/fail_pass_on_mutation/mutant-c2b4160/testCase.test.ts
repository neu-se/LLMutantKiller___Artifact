import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest() when no ops remain', () => {
  it('rest() returns empty array when all ops have been consumed', () => {
    const iter = new OpIterator([{ insert: 'Hi' }]);
    iter.next(2); // consume all ops, offset === 0, index === 1 (past end)

    const result = iter.rest();

    expect(result).toEqual([]);
  });
});
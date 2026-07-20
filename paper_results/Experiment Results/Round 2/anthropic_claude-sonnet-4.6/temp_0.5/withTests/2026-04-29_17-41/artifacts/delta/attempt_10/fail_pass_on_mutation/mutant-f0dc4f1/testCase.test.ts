import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType after partial iteration', () => {
  it('correctly identifies retain type after consuming part of a retain op', () => {
    const iter = new OpIterator([{ retain: 10 }]);
    iter.next(3); // consume part of the retain op
    // offset is now 3, still pointing at retain op
    expect(iter.peekType()).toBe('retain');
    expect(iter.peekLength()).toBe(7);
  });
});
import OpIterator from "../src/OpIterator";

describe('OpIterator peekType with null retain', () => {
  it('should return insert type when retain is null (not object retain)', () => {
    // An op with retain: null should be treated as an insert, not a retain
    // because null is not a valid object retain value
    const iter = new OpIterator([{ retain: null as any }]);
    expect(iter.peekType()).toEqual('insert');
  });
});
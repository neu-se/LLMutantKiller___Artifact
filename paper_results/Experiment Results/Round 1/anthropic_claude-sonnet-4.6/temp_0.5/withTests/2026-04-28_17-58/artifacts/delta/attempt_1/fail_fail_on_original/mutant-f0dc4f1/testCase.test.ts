import OpIterator from "../src/OpIterator";

describe('OpIterator peekType() for retain op', () => {
  it('should return "retain" when the current op is a numeric retain', () => {
    const iter = new OpIterator([{ retain: 5 }]);
    expect(iter.peekType()).toEqual('retain');
  });
});
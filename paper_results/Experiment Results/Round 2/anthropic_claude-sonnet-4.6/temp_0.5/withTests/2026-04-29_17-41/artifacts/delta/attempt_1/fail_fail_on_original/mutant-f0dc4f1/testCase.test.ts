import OpIterator from "../src/OpIterator";

describe('OpIterator peekType() for retain ops', () => {
  it('should return "retain" for a numeric retain op', () => {
    const iter = new OpIterator([{ retain: 3 }]);
    expect(iter.peekType()).toEqual('retain');
  });
});
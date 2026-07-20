import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType strict string check', () => {
  it('peekType returns exactly the string retain not undefined for retain op', () => {
    const iter = new OpIterator([{ retain: 5 }]);
    const result = iter.peekType();
    // Must be exactly 'retain' string returned from inside the if(op) block
    expect(result).toStrictEqual('retain');
    expect(typeof result).toBe('string');
  });
});
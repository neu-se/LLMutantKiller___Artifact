import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator peekType', () => {
  it('should return "retain" for object retain with null value', () => {
    const ops = [{ retain: null }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toEqual('retain');
  });
});
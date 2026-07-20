import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Iterator next() with retain object', () => {
  it('should correctly handle retain object with null value', () => {
    const ops = [{ retain: {} }];
    const iterator = new Iterator(ops);
    const result = iterator.next();
    expect(result).toEqual({ retain: {} });
  });
});
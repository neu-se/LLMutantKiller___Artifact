import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Iterator next() with retain object', () => {
  it('should handle retain object with null value correctly', () => {
    const ops = [{ retain: null }];
    const iterator = new Iterator(ops);
    const result = iterator.next();
    expect(result).toEqual({ retain: null });
  });
});
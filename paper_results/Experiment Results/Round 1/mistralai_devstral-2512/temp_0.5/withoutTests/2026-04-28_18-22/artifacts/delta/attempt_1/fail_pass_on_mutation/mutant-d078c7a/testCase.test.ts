import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Iterator next() with retain object', () => {
  it('should handle retain object correctly when offset is 0 and length is 1', () => {
    const ops = [{ retain: { key: 'value' } }];
    const iterator = new Iterator(ops);
    const result = iterator.next(1);
    expect(result).toEqual({ retain: { key: 'value' } });
  });
});
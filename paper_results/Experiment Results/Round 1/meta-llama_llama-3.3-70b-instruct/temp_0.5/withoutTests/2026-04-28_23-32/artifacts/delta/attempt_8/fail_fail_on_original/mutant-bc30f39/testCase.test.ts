import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct rest operations when there are two operations and the first one has been fully consumed', () => {
    const ops: Op[] = [
      { retain: 1 },
      { retain: 2 },
    ];
    const iterator = new Iterator(ops);
    iterator.next(1);
    const rest = iterator.rest();
    expect(rest).toEqual([{ retain: 2 }, { retain: Infinity }]);
  });
});
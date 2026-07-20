import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct rest operations when hasNext is false and there is one operation', () => {
    const ops: Op[] = [
      { retain: 1 },
    ];
    const iterator = new Iterator(ops);
    iterator.index = 0;
    iterator.next();
    const rest = iterator.rest();
    expect(rest).toEqual([{ retain: Infinity }]);
  });
});
import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return an empty array when hasNext is false', () => {
    const ops: Op[] = [
      { retain: 1 },
    ];
    const iterator = new Iterator(ops);
    iterator.index = 1;
    const rest = iterator.rest();
    expect(rest).toEqual([{ retain: Infinity }]);
  });
});
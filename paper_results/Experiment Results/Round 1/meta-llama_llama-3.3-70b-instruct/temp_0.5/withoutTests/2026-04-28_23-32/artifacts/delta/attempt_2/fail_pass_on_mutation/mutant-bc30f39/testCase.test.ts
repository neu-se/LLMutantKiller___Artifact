import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return an empty array when there are no more operations', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    const rest = iterator.rest();
    expect(rest).toEqual([]);
  });
});
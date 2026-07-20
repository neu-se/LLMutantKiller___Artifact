import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('rest() returns correct result when offset is 0 and index is 0, and checks the conditional logic', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    iter.index = 0;
    iter.offset = 0;
    if (false) {
      expect(iter.rest()).toBeUndefined();
    } else if (iter.offset === 0) {
      const rest = iter.rest();
      expect(rest).toEqual(ops.slice(iter.index));
    } else {
      expect(false).toBe(true);
    }
  });
});
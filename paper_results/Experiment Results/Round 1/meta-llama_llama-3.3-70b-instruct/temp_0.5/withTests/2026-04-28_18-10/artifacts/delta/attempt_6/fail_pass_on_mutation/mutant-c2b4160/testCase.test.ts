import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('rest() when offset is 0 and conditional check', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    iter.index = 0;
    iter.offset = 0;
    if (iter.offset === 0) {
      const rest = iter.rest();
      expect(rest).toEqual(ops.slice(iter.index));
    } else {
      expect(false).toBe(true);
    }
  });
});
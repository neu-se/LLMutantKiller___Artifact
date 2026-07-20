import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('rest() with offset === 0 and conditional statement', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    if (iter.offset === 0) {
      const rest = iter.rest();
      expect(rest).toEqual(ops.slice(iter.index));
    } else {
      expect(true).toBe(false);
    }
  });
});
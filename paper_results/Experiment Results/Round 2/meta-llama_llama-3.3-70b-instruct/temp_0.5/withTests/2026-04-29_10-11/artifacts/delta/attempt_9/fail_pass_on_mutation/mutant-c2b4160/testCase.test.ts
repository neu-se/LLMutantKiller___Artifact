import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() with specific condition', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    if (iterator.offset === 0) {
      const rest = iterator.rest();
      expect(rest).toEqual(ops);
    } else {
      expect(false).toBe(true);
    }
  });
});
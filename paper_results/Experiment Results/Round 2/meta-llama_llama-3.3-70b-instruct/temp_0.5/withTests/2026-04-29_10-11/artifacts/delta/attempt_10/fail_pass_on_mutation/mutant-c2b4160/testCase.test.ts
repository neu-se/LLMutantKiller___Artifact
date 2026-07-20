import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('rest() with offset 0 and index 0, then check length', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    const rest = iterator.rest();
    expect(rest.length).toBe(ops.length);
  });
});
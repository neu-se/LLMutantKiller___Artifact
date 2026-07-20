import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('rest() returns correct result when offset is 0 and index is 0, and checks the else if condition', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    iter.index = 0;
    iter.offset = 0;
    const rest = iter.rest();
    expect(iter.index).toBe(0);
    expect(iter.offset).toBe(0);
    expect(rest).toEqual(ops);
  });
});
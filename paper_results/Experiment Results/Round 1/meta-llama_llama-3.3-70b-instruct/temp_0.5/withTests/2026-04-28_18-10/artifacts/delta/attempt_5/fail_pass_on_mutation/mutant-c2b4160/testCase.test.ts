import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('rest() when offset is 0', () => {
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
    expect(rest.length).toBeGreaterThan(0);
    expect(rest[0]).toEqual(ops[0]);
  });
});
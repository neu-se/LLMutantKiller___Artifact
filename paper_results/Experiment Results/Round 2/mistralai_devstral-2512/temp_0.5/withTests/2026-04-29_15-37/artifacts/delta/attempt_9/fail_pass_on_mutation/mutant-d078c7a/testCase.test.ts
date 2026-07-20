import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with retain object', () => {
  it('should correctly handle retain object with length 1', () => {
    const ops = [
      { retain: { figure: true }, attributes: { src: 'http://example.com' } },
      { insert: 'test' }
    ];
    const iterator = new OpIterator(ops);
    const result = iterator.next(1);
    expect(result).toEqual({ retain: { figure: true }, attributes: { src: 'http://example.com' } });
    expect(iterator.next()).toEqual({ insert: 'test' });
  });
});
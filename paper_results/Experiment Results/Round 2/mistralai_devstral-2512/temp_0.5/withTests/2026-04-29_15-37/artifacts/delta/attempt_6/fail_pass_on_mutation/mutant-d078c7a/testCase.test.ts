import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with retain object', () => {
  it('should correctly process retain object with attributes', () => {
    const ops = [
      { retain: { figure: true }, attributes: { src: 'http://example.com' } },
      { insert: 'test' }
    ];
    const iterator = new OpIterator(ops);
    const firstResult = iterator.next();
    expect(firstResult).toEqual({ retain: { figure: true }, attributes: { src: 'http://example.com' } });
    const secondResult = iterator.next();
    expect(secondResult).toEqual({ insert: 'test' });
  });
});
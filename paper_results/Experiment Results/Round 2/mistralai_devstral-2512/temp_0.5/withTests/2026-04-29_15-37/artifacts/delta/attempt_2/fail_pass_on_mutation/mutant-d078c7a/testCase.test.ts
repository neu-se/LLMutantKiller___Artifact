import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with retain object', () => {
  it('should correctly handle retain object with attributes', () => {
    const ops = [{ retain: { figure: true }, attributes: { src: 'http://example.com' } }];
    const iterator = new OpIterator(ops);
    const result = iterator.next();
    expect(result).toEqual({ retain: { figure: true }, attributes: { src: 'http://example.com' } });
  });
});
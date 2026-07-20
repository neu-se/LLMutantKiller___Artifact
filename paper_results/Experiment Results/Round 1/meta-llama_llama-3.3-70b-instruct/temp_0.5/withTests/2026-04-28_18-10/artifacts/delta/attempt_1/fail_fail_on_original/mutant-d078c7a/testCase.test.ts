import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return correct op when nextOp.retain is an object and nextOp.retain!== null', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: { foo: 'bar' } },
    ];
    const iterator = new OpIterator(ops);
    iterator.next();
    const nextOp = iterator.next();
    expect(nextOp).toEqual({ retain: { foo: 'bar' } });
  });
});
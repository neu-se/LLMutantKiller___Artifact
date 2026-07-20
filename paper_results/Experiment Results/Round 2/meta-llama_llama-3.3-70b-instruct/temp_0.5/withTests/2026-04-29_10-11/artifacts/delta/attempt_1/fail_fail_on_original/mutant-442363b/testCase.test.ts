import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts';

describe('OpIterator', () => {
  it('peekType() with null check', () => {
    const ops = [
      { insert: 'Hello' },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('insert');
    iterator.next();
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    expect(iterator.peekType()).toBe('insert');
    iterator.next();
    expect(iterator.peekType()).toBe('delete');
    iterator.next();
    expect(iterator.peekType()).toBe('retain');
  });
});
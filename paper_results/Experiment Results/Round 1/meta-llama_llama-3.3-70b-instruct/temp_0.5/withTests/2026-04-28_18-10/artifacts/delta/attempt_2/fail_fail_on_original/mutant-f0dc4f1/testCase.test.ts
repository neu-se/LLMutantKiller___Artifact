import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return the correct type when peekType is called with a retain op that has a number value for retain', () => {
    const ops = [
      { retain: 1 },
    ];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toBe('retain');
  });
});
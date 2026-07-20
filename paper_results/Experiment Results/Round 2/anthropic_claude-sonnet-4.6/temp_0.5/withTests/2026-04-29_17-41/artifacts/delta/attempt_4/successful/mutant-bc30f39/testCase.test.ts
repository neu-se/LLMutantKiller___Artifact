import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator rest()', () => {
  it('rest() calls hasNext to determine if iterator is exhausted', () => {
    const iter = new OpIterator([{ insert: 'Hello' }]);
    iter.next(5); // exhaust the iterator
    
    const hasNextSpy = jest.spyOn(iter, 'hasNext');
    
    iter.rest();
    
    // In original code, hasNext() is called in the if condition
    // In mutated code, if(false) means hasNext() is never called
    expect(hasNextSpy).toHaveBeenCalled();
  });
});
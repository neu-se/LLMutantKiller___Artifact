import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('exposes mutation in transformedData assignment for numeric otherData', () => {
    // a is longer than b, and a has a delete after the extra retain
    // When otherIter exhausts, otherData=Infinity but length=finite
    // Original: transformedData=length (finite)  
    // Mutated: transformedData=Infinity
    // The delete after prevents chop from removing the plain retain
    const a = new Delta().retain(3).delete(1);
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, false);
    // Original: retain(1,bold) + retain(2) [from 2 iterations of exhausted] + delete(1)
    // But retain(2) gets chopped? No - delete(1) is last, not chopped
    // Actually retain(2) plain + delete(1): retain(2) won't be chopped since delete follows
    const expected = new Delta().retain(1, { bold: true }).retain(2).delete(1);
    expect(result).toEqual(expected);
  });
});
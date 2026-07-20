import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('correctly uses length when other iterator is exhausted and returns Infinity retain', () => {
    // a retains 5, b retains 3 then inserts 'X'
    // After processing retain(3) and insert('X'), thisIter still has retain(2)
    // otherIter is exhausted, returns {retain: Infinity}
    // length = min(2, Infinity) = 2
    // otherData = Infinity (a number, not an object)
    // Original: typeof Infinity === 'object' => false => transformedData = length = 2
    // Mutated:  true && Infinity !== null => true => transformedData = Infinity
    const a = new Delta().retain(5);
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().retain(3).insert('X').retain(2);
    expect(a.transform(b, true)).toEqual(expected);
  });
});
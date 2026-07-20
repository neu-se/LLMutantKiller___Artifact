import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('correctly transforms when this retains more than other with trailing delete', () => {
    // a retains 3, b retains 1 with attributes then deletes 1
    // After processing retain(1): otherIter has delete(1) next
    // For the remaining retain(2) of a vs delete(1) of b:
    // thisOp = retain(1), otherOp = delete(1) -> delta.push(otherOp) -> delete(1)
    // Then remaining retain(1) of a vs exhausted b:
    // otherData = Infinity, length = 1
    // Original: transformedData = 1, retain(1) added
    // Mutated: transformedData = Infinity, retain(Infinity) -> chopped
    const a = new Delta().retain(3, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true }).delete(1);
    const expected = new Delta()
      .retain(1, { bold: true })
      .delete(1)
      .retain(1);
    expect(a.transform(b, false)).toEqual(expected);
  });
});
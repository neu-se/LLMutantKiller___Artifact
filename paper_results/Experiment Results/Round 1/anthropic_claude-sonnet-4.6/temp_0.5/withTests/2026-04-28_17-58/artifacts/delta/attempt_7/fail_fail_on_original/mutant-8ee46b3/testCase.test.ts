import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('correctly transforms when this has more retain ops than other', () => {
    // a retains 3, b retains 1 then exhausts
    // When processing the remaining 2 of a's retain:
    // otherIter is exhausted, peekLength() = Infinity, next(2) returns { retain: Infinity }
    // otherData = Infinity, length = 2
    // Original: typeof Infinity === 'object' -> false -> transformedData = length = 2
    // Mutated:  true -> transformedData = Infinity -> retain(Infinity) -> different!
    const a = new Delta().retain(3, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta()
      .retain(1, { bold: true })
      .retain(2);
    expect(a.transform(b, false)).toEqual(expected);
  });
});
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transforming a delete against a numeric retain should not produce boolean retain ops', () => {
    // thisOp=delete, otherOp=retain(number) -> goes to else retain branch
    // otherData = length (number), so ternary else branch taken
    // original: transformedData = false; mutated: transformedData = true
    const a = new Delta().delete(1);
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, true);
    // After delete consumes the position, retain should be gone (empty delta)
    // With mutation, retain(true, {bold:true}) creates {retain:true, attributes:{bold:true}}
    expect(result).toEqual(new Delta());
  });
});
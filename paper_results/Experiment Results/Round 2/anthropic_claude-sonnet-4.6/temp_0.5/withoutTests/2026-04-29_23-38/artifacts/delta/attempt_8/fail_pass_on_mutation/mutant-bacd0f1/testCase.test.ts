import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("transform produces correct retain value for number retain ops", () => {
    // When both ops are number retains, transformedData should equal length
    // Original: typeof 3 === 'object' && 3 !== null => false => use length (3)
    // Mutated: typeof 3 === 'object' || 3 !== null => true => use otherData (3)
    // Both give 3, so same result. The mutation is unkillable for valid inputs.
    // 
    // The only difference would be if otherData !== length, which requires
    // the iterator to return a retain value different from the argument.
    // This is impossible for valid number retains.
    //
    // Let me verify the transform output is correct for a basic case
    const a = new Delta().retain(5);
    const b = new Delta().retain(3, { bold: true });
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 3, attributes: { bold: true } }]);
  });
});
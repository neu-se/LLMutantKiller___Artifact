import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("trailing deletes with differing lengths - delete consumes retain", () => {
    // a deletes 1, b retains 1 with bold attribute
    // After transform: the retain should be dropped since content was deleted
    // Mutated code would incorrectly include retain(1, {bold:true}) since it doesn't continue
    const a = new Delta().delete(1);
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta();
    expect(a.transform(b, false)).toEqual(expected);
  });
});
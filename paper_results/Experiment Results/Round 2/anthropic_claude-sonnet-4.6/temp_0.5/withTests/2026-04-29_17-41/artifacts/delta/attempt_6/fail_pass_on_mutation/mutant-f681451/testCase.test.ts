import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete + retain with attributes: retain should be dropped when content is deleted", () => {
    const a = new Delta().delete(2).retain(1);
    const b = new Delta().retain(2, { bold: true }).delete(1);
    // When a deletes 2 chars and b retains those 2 chars with bold:
    // Original: thisOp={delete:2} -> continue, otherOp retain is dropped
    // Then thisOp={retain:1}, otherOp={delete:1} -> push delete
    // Expected: just delete(1)
    const expected = new Delta().delete(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});
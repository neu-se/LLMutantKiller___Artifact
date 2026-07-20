import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete + retain should produce empty delta because delete removes the retained content", () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1, { bold: true, color: "red" });
    const expected = new Delta();
    const result = a.transform(b, true);
    expect(result).toEqual(expected);
  });
});
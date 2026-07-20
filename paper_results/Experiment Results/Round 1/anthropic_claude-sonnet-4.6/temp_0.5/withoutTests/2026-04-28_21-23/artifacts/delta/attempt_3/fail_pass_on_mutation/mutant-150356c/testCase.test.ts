import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should preserve retain attributes when other starts with a plain retain", () => {
    const delta1 = new Delta().retain(3, { bold: true }).insert("X");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    // retain(3, {bold:true}) composed with retain(5) should keep the bold attribute
    const expected = new Delta().retain(3, { bold: true }).insert("X");
    expect(result.ops).toEqual(expected.ops);
  });
});
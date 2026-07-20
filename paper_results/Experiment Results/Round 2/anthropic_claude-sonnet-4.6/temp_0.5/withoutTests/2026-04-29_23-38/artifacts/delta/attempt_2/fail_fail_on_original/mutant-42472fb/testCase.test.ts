import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("correctly composes inserts from this with a retain-starting other that has attributes", () => {
    const a = new Delta().insert("Hi", { bold: true }).retain(3);
    const b = new Delta().retain(2, { italic: true }).retain(3);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: "Hi", attributes: { bold: true, italic: true } },
      { retain: 3 },
    ]);
  });
});
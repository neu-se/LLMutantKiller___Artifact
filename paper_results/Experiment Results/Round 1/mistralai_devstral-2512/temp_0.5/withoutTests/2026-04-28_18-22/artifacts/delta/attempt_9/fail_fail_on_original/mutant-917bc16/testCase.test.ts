import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should optimize when composing with a retain-only delta that matches the last operation", () => {
    const delta1 = new Delta().insert("Hello").retain(3, { bold: true });
    const delta2 = new Delta().retain(3, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { insert: "Hello" },
      { retain: 3, attributes: { bold: true } }
    ]);
  });
});
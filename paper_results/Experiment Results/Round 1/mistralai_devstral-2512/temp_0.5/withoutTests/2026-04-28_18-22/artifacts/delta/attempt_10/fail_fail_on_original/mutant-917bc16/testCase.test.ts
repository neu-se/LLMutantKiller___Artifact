import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should optimize when composing with a delta that ends with matching retains", () => {
    const delta1 = new Delta().insert("Hello").retain(3, { bold: true });
    const delta2 = new Delta().retain(3, { bold: true }).retain(2);
    const result = delta1.compose(delta2);
    // The optimization should concatenate the matching retains
    expect(result.ops).toEqual([
      { insert: "Hello" },
      { retain: 5, attributes: { bold: true } }
    ]);
  });
});
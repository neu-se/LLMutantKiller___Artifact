import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain without attributes when followed by insert", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(2);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { insert: "te" },
      { retain: 2 }
    ]);
  });
});
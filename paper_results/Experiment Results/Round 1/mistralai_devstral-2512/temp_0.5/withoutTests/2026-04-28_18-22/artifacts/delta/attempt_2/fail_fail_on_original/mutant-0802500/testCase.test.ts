import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain without attributes when followed by insert", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: "test" },
      { retain: 1 }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});
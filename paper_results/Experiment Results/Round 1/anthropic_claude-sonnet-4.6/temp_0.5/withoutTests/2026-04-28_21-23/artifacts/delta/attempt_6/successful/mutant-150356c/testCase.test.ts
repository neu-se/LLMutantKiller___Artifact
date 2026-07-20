import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should reorder insert before delete when composing raw ops with a leading plain retain", () => {
    const delta1 = new Delta([{ delete: 2 }, { insert: "X" }]);
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    const expected = new Delta([{ insert: "X" }, { delete: 2 }]);
    expect(result.ops).toEqual(expected.ops);
  });
});
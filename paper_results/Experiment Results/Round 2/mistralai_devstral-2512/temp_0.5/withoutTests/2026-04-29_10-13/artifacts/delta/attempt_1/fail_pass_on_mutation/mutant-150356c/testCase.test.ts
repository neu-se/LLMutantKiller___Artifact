import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain followed by insert operations", () => {
    const delta1 = new Delta().retain(5).insert("test");
    const delta2 = new Delta().retain(3).insert("abc");
    const result = delta1.compose(delta2);
    const expected = new Delta().retain(3).insert("abc").retain(2).insert("test");
    expect(result.ops).toEqual(expected.ops);
  });
});
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should not consume delete ops in the leading optimization loop when other starts with plain retain", () => {
    const delta1 = new Delta().delete(3).insert("hello");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    // delete(3) + insert("hello") composed with retain(5) should be delete(3) + insert("hello")
    const expected = new Delta().delete(3).insert("hello");
    expect(result.ops).toEqual(expected.ops);
  });
});
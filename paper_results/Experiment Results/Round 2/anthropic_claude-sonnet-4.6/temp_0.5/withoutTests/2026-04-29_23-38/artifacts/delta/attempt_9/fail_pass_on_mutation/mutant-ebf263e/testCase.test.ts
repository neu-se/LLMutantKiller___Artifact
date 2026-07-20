import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes document with leading inserts followed by retain-only other", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("Hello"));
  });
});
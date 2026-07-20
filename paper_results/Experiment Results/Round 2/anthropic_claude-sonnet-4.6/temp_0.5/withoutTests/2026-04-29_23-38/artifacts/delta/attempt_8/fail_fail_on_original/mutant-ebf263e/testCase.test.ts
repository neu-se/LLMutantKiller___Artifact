import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("uses leading inserts optimization to enable early exit optimization", () => {
    const a = new Delta().insert("Hello").retain(5);
    const b = new Delta().retain(10);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("Hello").retain(5));
  });
});
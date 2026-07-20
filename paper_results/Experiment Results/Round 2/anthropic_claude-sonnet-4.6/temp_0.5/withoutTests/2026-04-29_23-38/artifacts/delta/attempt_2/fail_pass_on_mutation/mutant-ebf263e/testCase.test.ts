import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("preserves inserts from this when other starts with a plain retain", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().retain(2).insert("X").retain(3);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("HeXllo"));
  });
});
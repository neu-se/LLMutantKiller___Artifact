import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly handles inserts followed by delete when other starts with retain", () => {
    const a = new Delta().insert("AB").delete(2);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("AB").delete(2));
  });
});
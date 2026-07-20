import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("correctly composes with leading retain when this has inserts at exact retain boundary", () => {
    const a = new Delta().insert("AB");
    const b = new Delta().retain(2).delete(1);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("AB").delete(1));
  });
});
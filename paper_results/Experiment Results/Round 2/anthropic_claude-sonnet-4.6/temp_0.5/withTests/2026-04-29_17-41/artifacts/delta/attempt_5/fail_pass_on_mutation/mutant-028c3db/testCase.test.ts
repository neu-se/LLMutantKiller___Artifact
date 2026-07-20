import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain start optimization with attributes", () => {
  it("should preserve insert ops unchanged when other starts with plain retain covering them", () => {
    const a = new Delta().insert("AB").retain(3);
    const b = new Delta().retain(2).retain(3, { bold: true });
    const expected = new Delta().insert("AB").retain(3, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});
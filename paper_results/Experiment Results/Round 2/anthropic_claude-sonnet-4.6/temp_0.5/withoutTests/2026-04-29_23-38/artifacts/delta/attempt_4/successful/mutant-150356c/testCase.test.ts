import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when this starts with delete and other starts with plain retain followed by insert", () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1).insert('Z');
    const result = a.compose(b);
    expect(result.ops).toEqual([{ delete: 1 }, { retain: 1 }, { insert: 'Z' }]);
  });
});
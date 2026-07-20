import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes delete followed by insert when other starts with plain retain", () => {
    // this: delete(2), insert('hello') - document changes
    // other: retain(5) - plain retain covering the 5 inserted chars
    const a = new Delta().delete(2).insert('hello');
    const b = new Delta().retain(5);
    const result = a.compose(b);
    // Expected: delete(2), insert('hello') - other's plain retain preserves everything
    expect(result.ops).toEqual([{ insert: 'hello' }, { delete: 2 }]);
  });
});
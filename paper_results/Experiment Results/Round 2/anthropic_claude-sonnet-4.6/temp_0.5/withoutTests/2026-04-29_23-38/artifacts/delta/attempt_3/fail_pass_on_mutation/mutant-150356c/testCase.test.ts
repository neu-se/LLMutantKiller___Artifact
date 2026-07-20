import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when this starts with delete and other starts with plain retain followed by delete", () => {
    // this: delete(1), insert('A') - replaces first char with 'A'
    // other: retain(1), delete(1) - keeps 'A', deletes second char
    // Expected: insert('A'), delete(2) - inserts 'A', deletes both original chars
    const a = new Delta().delete(1).insert('A');
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }, { delete: 2 }]);
  });
});
import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('complex transform with delete and retain ops', () => {
    // this: insert('a') + delete(1)
    // other: retain(1) + delete(1)
    const a = new Delta().insert('a').delete(1);
    const b = new Delta().retain(1).delete(1);
    const result = a.transform(b);
    // After 'a' inserts 'a' and deletes 1 char:
    // 'b' wants to retain 1 (the inserted 'a') and delete 1 (already deleted)
    // transform should give: retain(2) for the insert, then nothing for the delete
    expect(result.ops).toEqual([{ retain: 2 }]);
  });
});
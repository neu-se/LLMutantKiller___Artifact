import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should cancel insert with subsequent delete when other starts with plain retain', () => {
    // this: retain(2), insert('X')  - document has 2 chars, then insert X
    // other: retain(2), delete(1)   - retain 2, delete 1 (the inserted X)
    // Expected: retain(2) - the insert gets deleted
    const a = new Delta().retain(2).insert('X');
    const b = new Delta().retain(2).delete(1);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().retain(2));
  });
});
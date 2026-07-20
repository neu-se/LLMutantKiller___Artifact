import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should preserve inserts from this when other is a plain retain covering them', () => {
    const a = new Delta().insert('Hello').delete(3);
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('Hello').delete(3));
  });
});
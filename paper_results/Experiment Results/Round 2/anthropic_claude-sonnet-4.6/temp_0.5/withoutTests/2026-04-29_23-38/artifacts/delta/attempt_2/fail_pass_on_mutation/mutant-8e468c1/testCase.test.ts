import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('correctly composes retain followed by insert when other starts with plain retain', () => {
    const a = new Delta().retain(5).insert('X');
    const b = new Delta().retain(3);
    const result = a.compose(b);
    const expected = new Delta().retain(5).insert('X');
    expect(result.ops).toEqual(expected.ops);
  });
});
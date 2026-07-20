import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should not apply optimization when first operation is delete', () => {
    const a = new Delta().delete(1).insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('B').delete(1).insert('A');
    const result = a.compose(b);
    expect(result.ops).toEqual(expected.ops);
  });
});
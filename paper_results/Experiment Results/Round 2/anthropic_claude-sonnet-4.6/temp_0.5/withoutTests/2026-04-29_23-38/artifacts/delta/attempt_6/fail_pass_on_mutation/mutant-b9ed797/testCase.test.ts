import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should produce correct ops when pushing a delete after an insert with attributes', () => {
    const delta = new Delta();
    delta.insert('hello', { bold: true });
    delta.delete(3);
    expect(delta.ops).toEqual([
      { insert: 'hello', attributes: { bold: true } },
      { delete: 3 }
    ]);
    expect(delta.ops.length).toBe(2);
  });
});
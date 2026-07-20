import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should retain numeric length when transforming retain ops with attributes', () => {
    const a = new Delta().retain(3, { bold: true });
    const b = new Delta().retain(3, { italic: true });
    const result = a.transform(b, false);
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].retain).toBe(3);
  });
});
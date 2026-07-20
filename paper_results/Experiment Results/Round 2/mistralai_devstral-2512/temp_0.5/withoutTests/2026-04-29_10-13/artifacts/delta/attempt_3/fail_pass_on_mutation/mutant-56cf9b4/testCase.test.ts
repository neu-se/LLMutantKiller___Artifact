import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should handle retain operations with null attributes correctly', () => {
    const base = new Delta().insert('test');
    const delta = new Delta().retain(2, null);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([]);
  });
});
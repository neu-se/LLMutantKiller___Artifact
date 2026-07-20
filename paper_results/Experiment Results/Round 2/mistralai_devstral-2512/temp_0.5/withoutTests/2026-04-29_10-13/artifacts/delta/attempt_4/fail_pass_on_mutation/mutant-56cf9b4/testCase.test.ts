import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should correctly handle retain operations with attributes when inverting', () => {
    const base = new Delta().insert('Hello World');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0]).toHaveProperty('retain', 5);
    expect(inverted.ops[0]).toHaveProperty('attributes');
    expect(inverted.ops[0].attributes).toEqual({ bold: null });
  });
});
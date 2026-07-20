import Delta from "../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly invert a delta with an object retain', () => {
    const base = new Delta().insert('Hello, world!');
    const delta = new Delta().retain(1);
    const inverted = delta.invert(base);
    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0].retain).toBe(1);
  });
});
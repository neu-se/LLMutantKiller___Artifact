import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should correctly invert a delta with an object retain', () => {
    const base = new Delta().insert('Hello, world!');
    const delta = new Delta().retain({ image: 'image1' });
    const inverted = delta.invert(base);
    expect(inverted.ops).toBeDefined();
    expect(inverted.ops.length).toBeGreaterThan(0);
  });
});
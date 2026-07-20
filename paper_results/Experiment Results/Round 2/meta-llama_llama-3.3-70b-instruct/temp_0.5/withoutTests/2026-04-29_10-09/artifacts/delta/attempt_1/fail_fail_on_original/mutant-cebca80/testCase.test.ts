import { Delta } from '../../../../../src/Delta.ts';

describe('Delta', () => {
  it('should correctly invert a delta with an object retain', () => {
    const base = new Delta().insert('Hello, world!');
    const delta = new Delta().retain({ image: 'image1' });
    const inverted = delta.invert(base);
    expect(inverted.ops).toHaveLength(1);
    expect(inverted.ops[0].retain).toBe(1);
    expect(inverted.ops[0].insert).toBeUndefined();
  });
});
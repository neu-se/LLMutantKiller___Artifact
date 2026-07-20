import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should handle retain object correctly in invert method', () => {
    const delta = new Delta();
    delta.retain({ test: 'value' });
    const invertedDelta = delta.invert(new Delta());
    expect(invertedDelta.ops).toHaveLength(1);
    expect(invertedDelta.ops[0].retain).toBe(null);
  });
});
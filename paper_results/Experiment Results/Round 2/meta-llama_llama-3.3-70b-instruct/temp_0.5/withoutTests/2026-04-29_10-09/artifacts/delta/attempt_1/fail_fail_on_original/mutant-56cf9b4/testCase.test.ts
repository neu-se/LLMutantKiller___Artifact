import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with retain and attributes', () => {
    const delta = new Delta();
    delta.retain(1, { foo: 'bar' });
    const inverted = delta.invert(new Delta());
    expect(inverted.ops[0].retain).toBe(1);
    expect(inverted.ops[0].attributes).toEqual({ foo: null });
  });
});
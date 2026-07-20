import Delta from '../../../src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    expect(delta.retain(0)).toBe(delta);
    expect(delta.retain(-1)).toBe(delta);
    expect(delta.ops).toEqual([]);
  });
});
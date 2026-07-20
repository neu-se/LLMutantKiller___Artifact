import Delta from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    const delta2 = new Delta();
    delta2.insert('world!');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(2);
    expect(composedDelta.ops[0].insert).toBe('Hello, ');
    expect(composedDelta.ops[1].insert).toBe('world!');
  });
});
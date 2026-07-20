import Delta from './Delta';

describe('Delta', () => {
  it('should correctly handle compose with a retain operation', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(3);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].retain).toBe(5);
  });
});
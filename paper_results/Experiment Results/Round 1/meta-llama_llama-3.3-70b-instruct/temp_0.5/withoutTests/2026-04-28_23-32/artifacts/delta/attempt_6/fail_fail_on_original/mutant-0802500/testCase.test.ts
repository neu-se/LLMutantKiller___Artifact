import Delta from './Delta';

describe('Delta', () => {
  it('should correctly compose two deltas with a retain operation', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(3);
    const composedDelta = delta1.compose(delta2);
    if (composedDelta.ops.length !== 1) {
      throw new Error('Expected composed delta to have one operation');
    }
    const op = composedDelta.ops[0];
    if (op.retain !== 5) {
      throw new Error('Expected retain length to be 5');
    }
  });
});
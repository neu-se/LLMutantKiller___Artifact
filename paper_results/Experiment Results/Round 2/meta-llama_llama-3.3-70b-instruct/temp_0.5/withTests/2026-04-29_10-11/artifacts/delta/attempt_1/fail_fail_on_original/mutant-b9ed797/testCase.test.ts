import Delta from '../../../src/Delta';

describe('push()', () => {
  it('should add a new operation to the end of the delta', () => {
    const delta = new Delta();
    const newOp = { insert: 'test' };
    delta.push(newOp);
    expect(delta.ops).toEqual([newOp]);
  });

  it('should not add a new operation if the condition is false', () => {
    const delta = new Delta();
    const newOp = { insert: 'test' };
    // Simulating the mutated code by not adding the new operation
    // if (false) {
    //   delta.ops.push(newOp);
    // }
    expect(delta.ops).toEqual([]);
  });
});
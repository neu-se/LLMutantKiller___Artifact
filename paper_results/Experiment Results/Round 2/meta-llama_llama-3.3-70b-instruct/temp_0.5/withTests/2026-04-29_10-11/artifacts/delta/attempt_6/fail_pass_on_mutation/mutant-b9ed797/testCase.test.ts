import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('push()', () => {
  it('should add a new operation to the delta when the index is equal to the length of the ops array', () => {
    const delta = new Delta();
    delta.ops = [];
    const newOp = { insert: 'test' };
    const initialLength = delta.ops.length;
    delta.push(newOp);
    expect(delta.ops.length).toBe(initialLength + 1);
  });
});
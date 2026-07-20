import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle composition with insert', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');
    const delta2 = new Delta();
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].insert).toBe('Hello');
  });
});
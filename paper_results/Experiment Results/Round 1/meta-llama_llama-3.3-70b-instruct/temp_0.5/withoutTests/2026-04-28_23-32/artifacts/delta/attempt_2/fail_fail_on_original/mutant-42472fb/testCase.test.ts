import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose with a retain operation and an insert operation', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.retain(5);

    const delta2 = new Delta();
    delta2.retain(7);
    delta2.insert('World');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(3);
    expect(composedDelta.ops[0].insert).toBe('Hello, ');
    expect(composedDelta.ops[1].retain).toBe(5);
    expect(composedDelta.ops[2].insert).toBe('World');
  });
});
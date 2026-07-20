import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle composition correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.insert('world!', { bold: true });

    const delta2 = new Delta();
    delta2.retain(7);
    delta2.insert('cruel ');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(3);
    expect(composedDelta.ops[0].insert).toBe('Hello, ');
    expect(composedDelta.ops[1].insert).toBe('cruel ');
    expect(composedDelta.ops[2].insert).toBe('world!');
    expect(composedDelta.ops[2].attributes).toEqual({ bold: true });
  });
});
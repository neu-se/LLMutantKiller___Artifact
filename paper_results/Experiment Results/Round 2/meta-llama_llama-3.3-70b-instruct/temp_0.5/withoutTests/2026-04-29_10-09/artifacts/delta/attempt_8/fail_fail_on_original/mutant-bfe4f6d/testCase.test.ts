import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle compose correctly when firstOther is not null and retain is a number', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, World!');
    const delta2 = new Delta();
    delta2.retain(0);
    delta2.insert('!');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].insert).toBe('Hello, World!');
    expect(composedDelta.ops[1].insert).toBe('!');
  });
});
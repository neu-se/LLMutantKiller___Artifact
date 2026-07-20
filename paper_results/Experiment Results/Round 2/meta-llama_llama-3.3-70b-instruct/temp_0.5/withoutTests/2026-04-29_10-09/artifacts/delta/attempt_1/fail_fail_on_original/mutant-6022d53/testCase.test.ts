import Delta from '../src/Delta';

describe('Delta', () => {
  it('should correctly transform position when priority is false and offset is less than index', () => {
    const delta = new Delta([
      { insert: 'a' },
      { insert: 'b' },
      { delete: 1 },
    ]);
    const index = 2;
    const priority = false;
    const transformedIndex = delta.transformPosition(index, priority);
    expect(transformedIndex).toBe(3);
  });
});
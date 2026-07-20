import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform position when priority is false and offset is less than index', () => {
    const delta = new Delta();
    delta.insert('a');
    const index = 0;
    const priority = false;
    const transformedIndex = delta.transformPosition(index, priority);
    expect(transformedIndex).toBe(1);
  });
});
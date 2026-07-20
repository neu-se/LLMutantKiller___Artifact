import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform position when priority is false and offset is less than index', () => {
    const delta = new Delta();
    delta.insert('a');
    const index = 0;
    const priority = false;
    const transformedIndex = delta.transformPosition(index, priority);
    expect(transformedIndex).toBe(1);
    const delta2 = new Delta();
    delta2.insert('a');
    delta2.insert('b');
    const index2 = 0;
    const priority2 = false;
    const transformedIndex2 = delta2.transformPosition(index2, priority2);
    expect(transformedIndex2).toBe(2);
  });
});
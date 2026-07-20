import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transformPosition should correctly handle insert operations', () => {
    const delta = new Delta();
    delta.insert('a');
    const index = 0;
    const priority = true;
    const transformedIndex = delta.transformPosition(index, priority);
    expect(transformedIndex).toBe(1);
  });
});
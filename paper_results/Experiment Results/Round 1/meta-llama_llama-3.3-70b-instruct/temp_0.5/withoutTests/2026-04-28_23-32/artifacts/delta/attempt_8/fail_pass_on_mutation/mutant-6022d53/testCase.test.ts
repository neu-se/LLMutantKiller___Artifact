import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transformPosition should correctly handle insert operations', () => {
    const delta = new Delta();
    delta.insert('a');
    const index = 0;
    const priority = true;
    const transformedIndexOriginal = delta.transformPosition(index, priority);
    const transformedIndexMutated = delta.transformPosition(index, false);
    expect(transformedIndexOriginal).not.toBe(transformedIndexMutated);
  });
});
import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transformPosition should correctly handle insert operations', () => {
    const delta = new Delta();
    delta.insert('Hello');
    delta.retain(2);
    delta.insert(' World');
    const index = 0;
    const priority = false;
    const transformedIndex = delta.transformPosition(index, priority);
    expect(transformedIndex).toBe(0);
  });
});
import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('transformPosition should correctly handle insert operations', () => {
    const delta = new Delta([
      { insert: 'Hello' },
      { delete: 2 },
      { insert: ' World' },
    ]);
    const index = 5;
    const priority = false;
    const transformedIndex = delta.transformPosition(index, priority);
    expect(transformedIndex).toBe(8);
  });
});
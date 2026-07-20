import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should handle delete and retain correctly', () => {
    const delta1 = new Delta().insert('Hello, world!', { bold: true });
    const delta2 = new Delta().delete(13).retain({ italic: true });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].delete).toBe(13);
  });
});
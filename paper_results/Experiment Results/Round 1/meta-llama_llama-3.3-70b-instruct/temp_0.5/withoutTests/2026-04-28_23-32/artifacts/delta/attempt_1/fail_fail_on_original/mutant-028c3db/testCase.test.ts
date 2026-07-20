import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta().insert('Hello, ', { bold: true });
    const delta2 = new Delta().retain(7, { bold: true }).insert('world!', { italic: true });
    const composed = delta1.compose(delta2);
    expect(composed.length()).toBe(13);
    expect(composed.ops).toHaveLength(2);
    expect(composed.ops[0].retain).toBe(7);
    expect(composed.ops[0].attributes).toEqual({ bold: true });
    expect(composed.ops[1].insert).toBe('world!');
    expect(composed.ops[1].attributes).toEqual({ italic: true });
  });
});
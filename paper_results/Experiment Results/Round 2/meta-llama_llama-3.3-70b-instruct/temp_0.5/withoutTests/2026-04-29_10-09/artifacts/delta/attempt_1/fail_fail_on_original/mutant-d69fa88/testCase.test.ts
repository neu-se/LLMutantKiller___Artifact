import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly invert a Delta with a retain operation', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { delete: 5 },
      { insert: 'Hello', attributes: { bold: true } },
      { insert: ', World!' },
    ]);
  });
});
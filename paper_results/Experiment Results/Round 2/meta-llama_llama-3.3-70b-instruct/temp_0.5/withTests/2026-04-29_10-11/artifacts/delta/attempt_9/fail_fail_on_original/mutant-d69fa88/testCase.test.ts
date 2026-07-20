import Delta from '../../src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with an object', () => {
    const delta = new Delta().retain(1, { bold: true });
    const base = new Delta().insert('test');
    const inverted = delta.invert(base);
    expect(inverted.ops[0].retain).toEqual(1);
  });
});
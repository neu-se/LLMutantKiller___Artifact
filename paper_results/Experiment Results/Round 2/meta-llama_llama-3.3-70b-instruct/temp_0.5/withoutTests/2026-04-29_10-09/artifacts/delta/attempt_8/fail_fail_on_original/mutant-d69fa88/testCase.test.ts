import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a Delta with a retain operation', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain(13);
    const inverted = delta.invert(base);
    expect(inverted.length()).toBe(13);
  });
});
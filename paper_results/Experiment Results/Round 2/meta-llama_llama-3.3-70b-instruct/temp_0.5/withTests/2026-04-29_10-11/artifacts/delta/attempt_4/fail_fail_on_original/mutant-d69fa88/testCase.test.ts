import Delta from '../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with an object', () => {
    const delta = new Delta().retain(1, { embed: 1 });
    const base = new Delta().insert('test');
    const inverted = delta.invert(base);
    expect(inverted).not.toThrow();
  });
});
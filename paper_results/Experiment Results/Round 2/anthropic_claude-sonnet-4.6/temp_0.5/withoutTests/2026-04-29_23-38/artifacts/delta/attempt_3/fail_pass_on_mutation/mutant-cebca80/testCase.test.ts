import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should correctly invert a retain with attributes', () => {
    const base = new Delta().insert('Hello');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(new Delta().retain(5, { bold: null }));
  });
});
import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should correctly invert a retain with attributes across multiple base ops', () => {
    const base = new Delta().insert('A').insert('B').insert('C');
    const delta = new Delta().retain(3, { bold: true });
    const inverted = delta.invert(base);
    // With mutation: forEach runs retain for each base op (3 separate retain(1) ops)
    // With original: the else-if is false for number retain, so nothing added in forEach
    // The outer retain-number branch handles it differently
    expect(inverted.ops.length).toBe(1);
    expect(inverted).toEqual(new Delta().retain(3, { bold: null }));
  });
});
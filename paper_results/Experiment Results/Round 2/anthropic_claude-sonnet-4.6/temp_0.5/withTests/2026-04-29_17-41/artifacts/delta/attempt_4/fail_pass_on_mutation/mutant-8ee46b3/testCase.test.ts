import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain with attributes against retain preserves correct retain value', () => {
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().retain(1, { bold: true });
    // With priority=true, a's attribute wins, so bold:true is kept (color not overridden)
    // The retain value should be numeric 1, not boolean
    const result = a.transform(b, true);
    // retain value must be a number
    expect(result.ops.length).toBeGreaterThan(0);
    expect(typeof result.ops[0].retain).toBe('number');
    expect(result.ops[0].retain).toBe(1);
  });
});
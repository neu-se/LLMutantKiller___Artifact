import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert with numeric retain and attributes', () => {
  it('should correctly invert a delta with numeric retain and attributes without entering embed handler', () => {
    const base = new Delta().insert('Hello');
    const delta = new Delta().retain(5, { bold: true });
    
    // This should work correctly - invert the bold attribute
    const inverted = delta.invert(base);
    
    // The inverted delta should retain 5 chars with bold: null to remove the attribute
    expect(inverted.ops).toEqual([{ retain: 5, attributes: { bold: null } }]);
  });
});
import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.invert', () => {
  it('should not set null for key in attr when attr[key] equals base[key] (both undefined via explicit undefined value)', () => {
    // When attr has a key explicitly set to undefined and base doesn't have that key,
    // original: attr[key] !== base[key] is false (undefined !== undefined is false), so skip
    // mutated: true && base[key] === undefined is true, so sets null
    const attr: { [key: string]: unknown } = {};
    attr['bold'] = undefined;
    const base = {};
    const result = AttributeMap.invert(attr, base);
    // Original: bold is undefined === undefined, condition fails, bold not set to null -> {}
    // Mutated: condition is true, bold set to null -> { bold: null }
    expect(result).toEqual({});
  });
});
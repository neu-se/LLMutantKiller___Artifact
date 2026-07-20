import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.invert', () => {
  it('should not invert a key when attr[key] equals base[key] and base[key] is undefined', () => {
    // attr has a key explicitly set to undefined, base doesn't have that key
    // attr[key] === base[key] === undefined, so original won't set null
    // but mutated will set null
    const attr: { [key: string]: unknown } = {};
    Object.defineProperty(attr, 'bold', { value: undefined, enumerable: true });
    const base = {};
    const result = AttributeMap.invert(attr, base);
    // Original: attr['bold'] !== base['bold'] is false (both undefined), so no entry
    // Mutated: true && base['bold'] === undefined is true, so result = { bold: null }
    expect(result).toEqual({});
  });
});
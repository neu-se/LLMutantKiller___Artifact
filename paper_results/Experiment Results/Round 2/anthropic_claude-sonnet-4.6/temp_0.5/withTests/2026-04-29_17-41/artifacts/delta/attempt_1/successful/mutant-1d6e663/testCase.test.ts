import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert', () => {
  it('should not set null for keys where attr value equals base value (both undefined)', () => {
    // attr has a key explicitly set to undefined, base does not have that key
    // Original: attr[key] !== base[key] => undefined !== undefined => false, skip
    // Mutated: true && base[key] === undefined => true, sets memo[key] = null
    const attr: { [key: string]: unknown } = {};
    attr['bold'] = undefined;
    const base = {};
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({});
  });
});
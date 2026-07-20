import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.invert", () => {
  it("should not set a key to null when attr[key] equals base[key] (both undefined)", () => {
    // When attr has a key explicitly set to undefined and base doesn't have that key,
    // attr[key] === base[key] (both undefined), so original code skips it
    // but mutated code (true && base[key] === undefined) would set it to null
    const attr: { [key: string]: unknown } = {};
    attr['bold'] = undefined; // explicitly set to undefined
    
    const base = {};
    
    const result = AttributeMap.invert(attr, base);
    
    // Original: attr['bold'] !== base['bold'] is undefined !== undefined = false, so skip
    // Mutated: true && base['bold'] === undefined = true, so sets memo['bold'] = null
    // Original returns {} which becomes undefined (no keys), mutated returns { bold: null }
    expect(result).toEqual({});
  });
});
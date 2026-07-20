import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('should treat non-object b as empty object when b is not an object', () => {
    // The mutation removes the assignment `b = {}` when typeof b !== 'object'
    // Original: if (typeof b !== 'object') { b = {}; }
    // Mutated:  if (typeof b !== 'object') {}  (b remains as the non-object value)
    //
    // When b is a non-object (e.g., a string like 'hello'),
    // Original code sets b = {}, so Object.keys(b) = [] and b[key] = undefined for all keys
    // Mutated code leaves b as 'hello', so Object.keys('hello') = ['0','1','2','3','4']
    // and b['bold'] = undefined but b['0'] = 'h', b['1'] = 'e', etc.
    //
    // With a = { bold: true }, original returns { bold: null }
    // With a = { bold: true }, mutated returns { bold: null, '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }

    const a = { bold: true };
    const result = AttributeMap.diff(a, 'hello' as unknown as AttributeMap);

    // Original behavior: b becomes {}, result is { bold: null }
    expect(result).toEqual({ bold: null });
  });
});
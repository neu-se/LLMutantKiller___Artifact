import AttributeMap from "../../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('treats non-object b as empty, preserving a attributes', () => {
    // When b is explicitly passed as a non-object (e.g. a string),
    // typeof b !== 'object' is true.
    // Original: b = {} so cloneDeep({}) = {}, then a's keys are merged in -> { bold: true }
    // Mutated: b stays as the string, cloneDeep('somestring') = 'somestring',
    //   Object.keys('somestring') returns character indices ['0','1',...],
    //   and the result will NOT equal { bold: true }
    const a = { bold: true };
    const b = 'not-an-object' as unknown as undefined;
    expect(AttributeMap.compose(a, b)).toEqual({ bold: true });
  });
});
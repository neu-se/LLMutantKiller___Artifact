import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('handles non-object b by returning b directly', () => {
    const a = { bold: true, color: 'red' };
    // When b is a non-object primitive, original code enters the if block
    // The mutation changes the condition to if(false), skipping the block
    // This causes the function to proceed differently with a non-object b
    const result = AttributeMap.compose(a, 'string' as any);
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});
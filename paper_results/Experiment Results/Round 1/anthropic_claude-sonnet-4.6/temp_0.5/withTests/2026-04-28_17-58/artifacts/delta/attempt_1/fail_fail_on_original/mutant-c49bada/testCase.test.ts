import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should treat non-object a as empty object, preserving b attributes when a is not an object', () => {
    // When a is not an object (e.g., a string), the original code sets a = {}
    // The mutated code does NOT set a = {}, leaving a as a non-object
    // This means the for...in loop over a would iterate over string characters
    // or behave unexpectedly with a non-object value
    
    // We test by passing a non-object as `a` and a valid object as `b`
    // In the original: a gets reset to {}, so only b's attributes are returned
    // In the mutated: a remains a string, and the for...in loop may add unexpected keys
    
    const b = { bold: true, color: 'red' };
    // @ts-ignore - intentionally passing wrong type to test runtime behavior
    const result = AttributeMap.compose('not-an-object', b);
    
    // Original behavior: a is treated as {}, so result should equal b
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});
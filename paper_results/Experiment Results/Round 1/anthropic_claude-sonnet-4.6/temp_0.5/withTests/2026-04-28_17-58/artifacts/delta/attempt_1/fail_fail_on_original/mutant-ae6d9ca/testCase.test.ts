// Jest test file
import AttributeMap from "../../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff with non-object a', () => {
  it('should treat non-object a as empty object when computing diff', () => {
    const b = { bold: true, color: 'red' };
    // When a is not an object (e.g., a string), original resets a={}, b={}
    // so result should be undefined (both empty after reset)
    // In mutated code, a stays as string, Object.keys on string gives char indices
    const result = AttributeMap.diff('not an object' as any, undefined);
    expect(result).toEqual(undefined);
  });
});
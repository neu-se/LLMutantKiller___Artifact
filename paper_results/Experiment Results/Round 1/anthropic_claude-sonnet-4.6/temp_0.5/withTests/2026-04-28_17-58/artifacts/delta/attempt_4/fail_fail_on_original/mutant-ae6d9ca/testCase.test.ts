import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('treats non-object a as empty object when a is a non-object type', () => {
    const result = AttributeMap.diff('hello' as any, undefined);
    expect(result).toBeUndefined();
  });
});
import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should not add attributes from a when a is undefined and b does not have them', () => {
    const a = { foo: undefined };
    const b = { };

    const result = AttributeMap.compose(a, b);
    expect(result).toBeUndefined();
  });
});
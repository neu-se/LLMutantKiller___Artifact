import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should only add attributes from a when b does not have them and a is not undefined', () => {
    const a = { foo: undefined };
    const b = { baz: 'qux' };

    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ baz: 'qux' });
  });
});
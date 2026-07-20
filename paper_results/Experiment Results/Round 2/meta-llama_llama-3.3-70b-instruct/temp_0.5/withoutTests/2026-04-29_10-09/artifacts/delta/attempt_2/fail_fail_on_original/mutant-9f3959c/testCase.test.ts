import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should only add attributes from a when b does not have them and a is not undefined', () => {
    const a = { foo: 'bar' };
    const b = { foo: 'qux' };

    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: 'bar' });
  });
});
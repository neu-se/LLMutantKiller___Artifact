import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should return an object when a is not an object', () => {
    const a = 'string';
    const b = { foo: 'bar' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: 'bar' });
  });
});
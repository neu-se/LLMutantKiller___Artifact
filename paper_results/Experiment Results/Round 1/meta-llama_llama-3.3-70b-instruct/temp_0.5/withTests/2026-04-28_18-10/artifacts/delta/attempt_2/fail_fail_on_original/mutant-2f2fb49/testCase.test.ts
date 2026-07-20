import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose() should handle b being not an object', () => {
    const a = { foo: 'bar' };
    const b = 'string';
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});
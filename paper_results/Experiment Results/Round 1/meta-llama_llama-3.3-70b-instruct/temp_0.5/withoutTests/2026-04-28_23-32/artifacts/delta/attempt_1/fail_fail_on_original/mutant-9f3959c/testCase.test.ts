import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should compose attribute maps correctly', () => {
    const a = { foo: 'bar', baz: undefined };
    const b = { foo: 'qux', quux: 'corge' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: 'bar', quux: 'corge' });
  });
});
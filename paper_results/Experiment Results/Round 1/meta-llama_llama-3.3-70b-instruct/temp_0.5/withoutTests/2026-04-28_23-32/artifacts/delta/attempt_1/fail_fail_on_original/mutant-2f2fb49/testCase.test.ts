import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose function handles non-object b correctly', () => {
    const a = { foo: 'bar' };
    const b = 'not an object';
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: 'bar' });
  });
});
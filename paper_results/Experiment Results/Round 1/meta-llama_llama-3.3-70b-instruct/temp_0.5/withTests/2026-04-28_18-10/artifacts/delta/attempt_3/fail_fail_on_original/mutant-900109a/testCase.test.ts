import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose() should handle mutation correctly', () => {
    const a = { a: 'a' };
    const b = { b: 'b' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ a: 'a', b: 'b' });
  });
});
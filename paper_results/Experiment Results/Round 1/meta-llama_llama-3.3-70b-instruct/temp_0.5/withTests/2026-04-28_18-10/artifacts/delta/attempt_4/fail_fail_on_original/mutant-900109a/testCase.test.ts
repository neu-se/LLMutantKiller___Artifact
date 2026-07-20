import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose() should handle mutation correctly', () => {
    const a = { a: null };
    const b = { b: 'b' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ b: 'b' });
  });
});
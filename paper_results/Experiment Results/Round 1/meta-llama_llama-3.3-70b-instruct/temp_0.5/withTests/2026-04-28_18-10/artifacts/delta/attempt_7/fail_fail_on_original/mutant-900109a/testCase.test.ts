import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose() should handle mutation correctly', () => {
    const a = { a: 'value' };
    const b = { a: 'value' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ a: 'value' });
  });
});
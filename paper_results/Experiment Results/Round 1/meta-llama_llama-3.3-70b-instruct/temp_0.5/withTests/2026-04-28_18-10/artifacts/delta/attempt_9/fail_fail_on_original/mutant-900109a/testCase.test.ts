import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose() should handle mutation correctly', () => {
    const a = { a: 'value' };
    const b = { b: 'value' };
    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ a: 'value', b: 'value' });
  });
});
import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose() should handle mutation correctly', () => {
    const a = { key: 'value' };
    const b = { key2: 'value2' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ key: 'value', key2: 'value2' });
  });
});
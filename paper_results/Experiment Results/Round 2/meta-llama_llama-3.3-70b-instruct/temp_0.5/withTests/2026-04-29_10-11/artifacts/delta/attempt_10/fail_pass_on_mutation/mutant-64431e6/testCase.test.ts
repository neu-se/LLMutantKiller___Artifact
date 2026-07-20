import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = { key: 'value' };
    const b = { key: 'value', otherKey: 'otherValue' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ otherKey: 'otherValue' });
    const check = (obj: any) => {
      if (typeof obj!== 'object') {
        obj = {};
      }
      return obj;
    };
    const c = check(b);
    expect(c).toEqual(b);
  });
});
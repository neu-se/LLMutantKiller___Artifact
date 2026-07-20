import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a = { key: 'value' };
    const b = { key: 'value', otherKey: 'otherValue' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual({ otherKey: 'otherValue' });
    const c = { key: 'differentValue', otherKey: 'otherValue' };
    const result2 = AttributeMap.diff(a, c);
    expect(result2).toEqual({ key: 'differentValue', otherKey: 'otherValue' });
    const d = { key: 'value', otherKey: 'otherValue' };
    const result3 = AttributeMap.diff(b, d);
    expect(result3).toBeUndefined();
    const e = { key: 'value', otherKey: 'otherValue', anotherKey: 'anotherValue' };
    const result4 = AttributeMap.diff(b, e);
    expect(result4).toEqual({ anotherKey: 'anotherValue' });
    const f = { key: 'value', otherKey: 'otherValue', anotherKey: 'anotherValue', yetAnotherKey: 'yetAnotherValue' };
    const result5 = AttributeMap.diff(e, f);
    expect(result5).toEqual({ yetAnotherKey: 'yetAnotherValue' });
    const g = { key: 'value', otherKey: 'otherValue', anotherKey: 'anotherValue', yetAnotherKey: 'yetAnotherValue', andYetAnotherKey: 'andYetAnotherValue' };
    const result6 = AttributeMap.diff(f, g);
    expect(result6).toEqual({ andYetAnotherKey: 'andYetAnotherValue' });
    const h = { key: 'value', otherKey: 'otherValue', anotherKey: 'anotherValue', yetAnotherKey: 'yetAnotherValue', andYetAnotherKey: 'andYetAnotherValue', andAnotherKey: 'andAnotherValue' };
    const result7 = AttributeMap.diff(g, h);
    expect(result7).toEqual({ andAnotherKey: 'andAnotherValue' });
    const i = { key: 'value', otherKey: 'otherValue', anotherKey: 'anotherValue', yetAnotherKey: 'yetAnotherValue', andYetAnotherKey: 'andYetAnotherValue', andAnotherKey: 'andAnotherValue', yetAnotherKey2: 'yetAnotherValue2' };
    const result8 = AttributeMap.diff(h, i);
    expect(result8).toEqual({ yetAnotherKey2: 'yetAnotherValue2' });
  });
});
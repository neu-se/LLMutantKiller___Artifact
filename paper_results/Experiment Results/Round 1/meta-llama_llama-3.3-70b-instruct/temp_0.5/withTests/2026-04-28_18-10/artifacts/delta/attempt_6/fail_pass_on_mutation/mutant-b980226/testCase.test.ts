import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform with priority should return the correct result', () => {
    const a: AttributeMap = { bold: true, color: 'red' };
    const b: AttributeMap = { color: 'blue', italic: true };
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(Object.keys(result).length).toBe(1);
    const priority2 = false;
    const result2 = AttributeMap.transform(a, b, priority2);
    expect(Object.keys(result2).length).toBeGreaterThan(1);
  });
});
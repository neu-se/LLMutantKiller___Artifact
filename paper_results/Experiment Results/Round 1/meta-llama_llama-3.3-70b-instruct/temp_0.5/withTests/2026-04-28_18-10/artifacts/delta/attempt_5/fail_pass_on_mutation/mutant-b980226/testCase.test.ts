import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform with priority should return the correct result', () => {
    const a = { bold: true, color: 'red' };
    const b = { color: 'blue', italic: true };
    const priority = true;
    const result1 = AttributeMap.transform(a, b, priority);
    const priority2 = false;
    const result2 = AttributeMap.transform(a, b, priority2);
    expect(result1).not.toEqual(result2);
  });
});
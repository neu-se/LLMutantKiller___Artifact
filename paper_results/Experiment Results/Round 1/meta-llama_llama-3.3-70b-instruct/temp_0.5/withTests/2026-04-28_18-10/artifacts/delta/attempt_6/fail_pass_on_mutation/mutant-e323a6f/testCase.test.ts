import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform() should return an object when a is empty and b is empty and priority is false', () => {
    const a: any = {};
    const b: any = {};
    const priority = false;
    const result = AttributeMap.transform(a, b, priority);
    expect(typeof result).toBe('object');
  });
});
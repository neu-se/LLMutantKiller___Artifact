import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform() should return undefined when a is empty and b is empty', () => {
    const a: any = {};
    const b: any = {};
    const priority = false;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).not.toEqual({});
  });
});
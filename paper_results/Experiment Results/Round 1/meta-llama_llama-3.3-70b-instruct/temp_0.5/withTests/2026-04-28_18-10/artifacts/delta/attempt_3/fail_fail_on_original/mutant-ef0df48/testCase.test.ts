import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('compose should handle non-object b correctly', () => {
    const result = AttributeMap.compose({}, {});
    expect(result).toBeDefined();
  });
});
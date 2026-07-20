import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap', () => {
  it('compose should handle non-object b correctly', () => {
    const result = AttributeMap.compose({}, 'not an object');
    expect(result).toBeUndefined();
  });
});
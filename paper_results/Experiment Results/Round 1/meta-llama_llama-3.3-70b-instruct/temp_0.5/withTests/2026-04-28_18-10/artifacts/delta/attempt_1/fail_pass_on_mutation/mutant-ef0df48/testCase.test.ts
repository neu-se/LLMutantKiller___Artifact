import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap', () => {
  it('compose should handle non-object b correctly', () => {
    expect(() => AttributeMap.compose({}, 'not an object')).toThrow();
  });
});
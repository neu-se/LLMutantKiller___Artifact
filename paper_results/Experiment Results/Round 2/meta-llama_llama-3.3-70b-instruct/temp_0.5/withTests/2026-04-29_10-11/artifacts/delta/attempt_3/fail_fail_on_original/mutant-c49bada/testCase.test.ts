import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose function', () => {
  it('should return the correct result when the first argument is not an object', () => {
    expect(AttributeMap.compose('string', {})).toEqual({});
  });
});
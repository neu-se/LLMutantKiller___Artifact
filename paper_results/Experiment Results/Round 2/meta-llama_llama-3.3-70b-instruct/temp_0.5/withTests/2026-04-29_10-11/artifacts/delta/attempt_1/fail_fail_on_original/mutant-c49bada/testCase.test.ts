import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose function', () => {
  it('should throw an error when the first argument is not an object', () => {
    expect(() => AttributeMap.compose('string', {})).toThrowError(
      'a must be an object',
    );
  });
});
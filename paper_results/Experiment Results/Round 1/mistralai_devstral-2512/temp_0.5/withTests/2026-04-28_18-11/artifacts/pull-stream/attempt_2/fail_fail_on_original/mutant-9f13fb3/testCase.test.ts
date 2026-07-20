import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull';
import * as prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function with string key', () => {
  it('should return a function that retrieves the value for the given string key', () => {
    const getName = prop('name');
    const data = { name: 'Alice', age: 30 };
    const result = getName(data);
    expect(result).toBe('Alice');
  });
});
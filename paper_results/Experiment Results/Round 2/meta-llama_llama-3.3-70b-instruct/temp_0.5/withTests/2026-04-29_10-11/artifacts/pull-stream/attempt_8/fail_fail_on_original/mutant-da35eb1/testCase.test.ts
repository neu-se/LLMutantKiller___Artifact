import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();

    values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], find(testFunction, callback));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 7);
  });
});
import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();

    pull(
      pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      pull.find(testFunction, callback)
    );

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 7);
  });
});
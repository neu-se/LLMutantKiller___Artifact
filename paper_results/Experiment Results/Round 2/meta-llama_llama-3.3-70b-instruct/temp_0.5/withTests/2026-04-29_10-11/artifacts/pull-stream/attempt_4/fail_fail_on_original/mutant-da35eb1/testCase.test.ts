import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('find', () => {
  it('should call callback with null error and found value when test function returns true', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    pull(
      pull.values(values),
      pull.find(testFunction, callback)
    );

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 7);
  });

  it('should call callback with error when error is not null', () => {
    const testFunction = (data: any) => data === 7;
    const callback = jest.fn();
    const error = new Error('Test error');
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    pull(
      pull.values(values),
      pull.find(testFunction, (err: any, data: any) => {
        if (err) {
          expect(err).toBeInstanceOf(Error);
          expect(data).toBeNull();
        } else {
          expect(data).toBe(7);
        }
      })
    );

    expect(callback).not.toHaveBeenCalled();
  });
});
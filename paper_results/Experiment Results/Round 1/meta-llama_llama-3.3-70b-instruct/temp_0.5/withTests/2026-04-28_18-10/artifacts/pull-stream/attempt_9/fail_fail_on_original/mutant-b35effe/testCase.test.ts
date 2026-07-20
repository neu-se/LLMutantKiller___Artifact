import pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('find', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const test = (data: any) => data === 7;
    const cb = jest.fn((err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(7);
    });

    pull(
      pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      pull.find(test, cb)
    );
    expect(cb).toHaveBeenCalledTimes(1);

    // Test with error
    const errorTest = (data: any) => data === 7;
    const errorCb = jest.fn((err: any, data: any) => {
      expect(err).toBe(true);
      expect(data).toBeNull();
    });

    pull(
      pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      pull.find(errorTest, errorCb)
    );
    expect(errorCb).toHaveBeenCalledTimes(1);
  });
});
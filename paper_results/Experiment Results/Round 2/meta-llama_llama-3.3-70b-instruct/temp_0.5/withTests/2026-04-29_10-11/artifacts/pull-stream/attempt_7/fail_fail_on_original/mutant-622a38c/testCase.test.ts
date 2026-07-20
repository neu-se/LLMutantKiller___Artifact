import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('reduce function', () => {
  it('should handle end correctly', () => {
    const source = pull.values([1, 2, 3]);
    const callback = jest.fn();

    pull(
      source,
      pull.reduce((acc: any, data: any) => acc + data, 0),
      pull.collect((err: any, result: any) => {
        callback(err, result);
      })
    );

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 6);
  });
});
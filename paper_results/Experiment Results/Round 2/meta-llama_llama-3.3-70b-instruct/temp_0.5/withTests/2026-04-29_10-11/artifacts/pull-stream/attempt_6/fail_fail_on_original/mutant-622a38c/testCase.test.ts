import { values } from "../../../../../../../../../../../subject_repositories/pull-stream";
import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce";

describe('reduce function', () => {
  it('should handle end correctly', () => {
    const source = values([1, 2, 3]);
    const callback = jest.fn();

    reduce((acc: any, data: any) => acc + data, 0, callback)(source);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 6);
  });
});
import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should return the correct result when the input stream ends immediately with an initial value and end is true', () => {
    const callback = jest.fn();
    const source = (end: any, cb: any) => {
      cb(true, 1);
    };
    const reducer = (acc: any, data: any) => {
      return acc + data;
    };
    const result = reduce(reducer, 0, callback)(source);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, null);
  });
});
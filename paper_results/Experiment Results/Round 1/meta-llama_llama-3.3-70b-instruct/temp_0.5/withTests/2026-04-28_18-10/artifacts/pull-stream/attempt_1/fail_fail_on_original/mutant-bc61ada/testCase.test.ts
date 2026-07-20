import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should return the correct result when the input stream ends immediately', () => {
    const callback = jest.fn();
    const source = (end: any, cb: any) => {
      cb(true, null);
    };
    const reducer = (acc: any, data: any) => {
      return acc + data;
    };
    const result = reduce(reducer, 0, callback)(source);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 0);
  });

  it('should return the correct result when the input stream ends with an error', () => {
    const callback = jest.fn();
    const source = (end: any, cb: any) => {
      cb(new Error('Test error'), null);
    };
    const reducer = (acc: any, data: any) => {
      return acc + data;
    };
    const result = reduce(reducer, 0, callback)(source);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(new Error('Test error'), undefined);
  });
});
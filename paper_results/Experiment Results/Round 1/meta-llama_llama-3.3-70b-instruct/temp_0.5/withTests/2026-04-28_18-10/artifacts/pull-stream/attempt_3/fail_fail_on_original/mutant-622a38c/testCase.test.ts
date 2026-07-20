import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should call cb with error when end is true', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(true, 'data');
    const result = reduce(reducer, null, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true, undefined);
  });
});
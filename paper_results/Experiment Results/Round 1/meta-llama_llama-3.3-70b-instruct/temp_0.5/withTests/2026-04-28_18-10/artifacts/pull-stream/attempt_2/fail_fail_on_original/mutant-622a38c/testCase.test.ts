import { reduce } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js';

describe('reduce function', () => {
  it('should call cb with error when end is true and no initial value', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(true, 'data');
    const result = reduce(reducer, cb, source);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 'data');
  });

  it('should not call cb with error when end is true and no initial value in mutated code', () => {
    // mocking the mutated reduce function
    const originalReduce = reduce;
    const mutatedReduce = (reducer: any, acc: any, cb: any) => {
      if (!cb) cb = acc, acc = null;
      var drain = (onData: any, onEnd: any) => {
        return (end: any, cb: any) => {
          if (end) onEnd(end);
          else onData(end);
        };
      };
      var sink = drain(function (data: any) {
        acc = reducer(acc, data);
      }, function (err: any) {
        cb(err, acc);
      });
      if (arguments.length === 2)
        return function (source: any) {
          source(null, function (end: any, data: any) {
            if (end) return cb(false? null : end); // mutated line
            acc = data; sink(source);
          });
        };
      else
        return sink;
    };

    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(true, 'data');
    const result = mutatedReduce(reducer, cb, source);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith('data', undefined);
  });
});
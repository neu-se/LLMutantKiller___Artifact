import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call cb with error when end is true', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(true, 'data');
    const result = reduce(reducer, null, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, undefined);
  });

  it('should call cb with error when end is true and false is returned in mutated code', () => {
    const cb = jest.fn();
    const reducer = (acc: any, data: any) => acc + data;
    const source = (end: any, cb: any) => cb(true, 'data');
    const mutatedReduce = (reducer: any, acc: any, cb: any) => {
      if (!cb) cb = acc, acc = null;
      var sink = (onData: any, onEnd: any) => {
        return (end: any, cb: any) => {
          if (end) onEnd(end);
          else onData(end);
        };
      };
      var result = sink(function (data: any) {
        acc = reducer(acc, data);
      }, function (err: any) {
        cb(err, acc);
      });
      if (arguments.length === 2)
        return function (source: any) {
          source(null, function (end: any, data: any) {
            if (end) return cb(false? null : end); // mutated line
            acc = data; result(source);
          });
        };
      else
        return result;
    };
    const result = mutatedReduce(reducer, null, cb);
    result(source);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith('data', undefined);
  });
});
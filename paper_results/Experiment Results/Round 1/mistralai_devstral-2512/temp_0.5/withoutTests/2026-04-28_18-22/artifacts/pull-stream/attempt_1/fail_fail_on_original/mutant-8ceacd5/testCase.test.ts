import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with more than 4 arguments', () => {
  it('should correctly handle cases with more than 4 arguments', () => {
    const source = (read) => {
      let count = 0;
      return function (end, cb) {
        if (count === 0) {
          count++;
          cb(null, 'data1');
        } else if (count === 1) {
          count++;
          cb(null, 'data2');
        } else {
          cb(true);
        }
      };
    };

    const sink = jest.fn();
    const partialSink = pull(sink);

    const read = source();
    const result = partialSink(read, 'arg1', 'arg2', 'arg3', 'arg4', 'arg5');

    expect(result).toBeDefined();
    expect(typeof result).toBe('function');
  });
});
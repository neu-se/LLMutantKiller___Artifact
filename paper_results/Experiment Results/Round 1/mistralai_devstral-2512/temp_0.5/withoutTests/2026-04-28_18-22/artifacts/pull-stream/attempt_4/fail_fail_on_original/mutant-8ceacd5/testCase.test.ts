import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with more than 4 arguments', () => {
  it('should correctly handle cases with more than 4 arguments', () => {
    const source = () => {
      return (end: any, cb: any) => {
        cb(null, 'data');
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
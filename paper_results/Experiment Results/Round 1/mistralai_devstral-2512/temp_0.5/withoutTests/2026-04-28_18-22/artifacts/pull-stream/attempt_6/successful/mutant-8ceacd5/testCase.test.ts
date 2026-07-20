import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with more than 4 arguments', () => {
  it('should handle more than 4 arguments by unshifting read and applying pull', () => {
    // Create a simple source function
    const source = () => {
      return (end: any, cb: any) => {
        cb(null, 'test-data');
      };
    };

    // Create a sink that collects data
    const data: any[] = [];
    const sink = (read: any) => {
      return (end: any, cb: any) => {
        if (end) return cb(end);
        read(null, (end: any, dataChunk: any) => {
          if (end) return cb(end);
          data.push(dataChunk);
          cb(null);
        });
      };
    };

    // Create partial sink with 5 arguments (more than 4)
    const partialSink = pull(sink, 'arg1', 'arg2', 'arg3', 'arg4', 'arg5');

    // Create read stream
    const read = source();

    // Apply the partial sink
    const result = partialSink(read);

    // The result should be a function (the final sink)
    expect(typeof result).toBe('function');

    // When we call the result, it should process data
    result(null, (end: any, resultData: any) => {
      expect(end).toBeNull();
      expect(resultData).toBeUndefined(); // Since we're just testing the flow
    });
  });
});
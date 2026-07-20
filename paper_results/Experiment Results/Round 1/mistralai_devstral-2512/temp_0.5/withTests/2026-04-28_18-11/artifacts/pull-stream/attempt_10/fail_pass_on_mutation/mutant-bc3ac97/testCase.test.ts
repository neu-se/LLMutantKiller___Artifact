import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle exactly 3 arguments in the pull function', () => {
    // Create a function that takes exactly 1 argument (to trigger the special case)
    const source = (read: any) => {
      return (abort: any, cb: any) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    };

    // Create two through streams
    const through1 = (read: any) => (abort: any, cb: any) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const through2 = (read: any) => (abort: any, cb: any) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };

    // Create a simple source that provides data
    const dataSource = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 5);
    };

    // This should trigger the case 3 in the switch statement
    const pipeline = pull(source, through1, through2);
    expect(typeof pipeline).toBe('function');
    expect(pipeline.length).toBe(1);

    // Execute the pipeline with the data source
    const result = pipeline(dataSource);
    expect(typeof result).toBe('function');
    expect(result.length).toBe(2);

    // Verify the pipeline works correctly
    result(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(11); // (5 * 2) + 1
    });
  });
});
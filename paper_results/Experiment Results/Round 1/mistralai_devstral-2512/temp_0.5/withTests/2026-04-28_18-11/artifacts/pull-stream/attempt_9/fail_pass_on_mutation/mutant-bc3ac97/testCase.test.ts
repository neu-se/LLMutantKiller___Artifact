import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle 3 arguments in the pull function', () => {
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 1);
    };

    const through1 = (read: any) => (abort: any, cb: any) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const through2 = (read: any) => (abort: any, cb: any) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data);
      });
    };

    const sink = (read: any) => {
      return (abort: any, cb: any) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          expect(data).toBe(2);
          cb(null);
        });
      };
    };

    const pipeline = pull(source, through1, through2, sink);
    expect(typeof pipeline).toBe('function');
    expect(pipeline.length).toBe(2);

    // Execute the pipeline and verify the data flow
    pipeline(null, (end: any) => {
      expect(end).toBeNull();
    });
  });
});
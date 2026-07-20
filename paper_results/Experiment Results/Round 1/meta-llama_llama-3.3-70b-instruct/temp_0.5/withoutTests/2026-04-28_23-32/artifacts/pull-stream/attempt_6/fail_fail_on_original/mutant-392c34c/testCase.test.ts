import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call callback with null error when stream ends with a true error', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).not.toBeNull();
      expect(data).toBeNull();
      done();
    };
    const stream = {
      pipe: (sink: any) => {
        sink(null, 'data');
        sink(true, null);
      },
      read: (end: any, cb: any) => {
        if (end) {
          cb(end, null);
        } else {
          cb(null, 'data');
        }
      },
      abort: () => {}
    };
    stream.pipe(find(test, cb));
  });
});
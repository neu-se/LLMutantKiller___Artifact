import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call callback with null error when stream ends with a false error', (done) => {
    const test = (data: any) => false;
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };
    const read = (end: any, cb: any) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    };
    const sink = (end: any, data: any) => {
      if (end === false) {
        callback(null, null);
      } else {
        read(end, (end: any, data: any) => {
          if (end) {
            callback(end, null);
          }
        });
      }
    };
    sink(false, null);
  });
});
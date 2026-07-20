import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call callback with error when stream ends with a false error in the mutated code', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).not.toBeNull();
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
        cb(false, null);
      } else {
        read(end, (end: any, data: any) => {
          if (end) {
            cb(end, null);
          }
        });
      }
    };
    const cb = (err: any, data: any) => {
      if (err === false) {
        throw new Error('Expected error to be not null');
      }
    };
    sink(false, null);
  });
});
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink', () => {
  it('should call callback with error when stream ends without match', (done) => {
    const test = (data: any) => data === 'match';
    const error = new Error('test error');
    const cb = (err: Error | null, data: any) => {
      expect(err).toBe(error);
      expect(data).toBeNull();
      done();
    };

    const source = {
      read: (abort: any, callback: (end: any, data: any) => void) => {
        callback(null, 'a');
        callback(null, 'b');
        callback(null, 'c');
        callback(error, null);
      }
    };

    const sink = find(test, cb);
    sink(source);
  });
});
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('find sink', () => {
  it('should call callback with error when stream ends without match', (done) => {
    const test = (data: any) => data === 'match';
    const error = new Error('test error');
    const cb = (err: Error | null, data: any) => {
      expect(err).toBe(error);
      expect(data).toBeNull();
      done();
    };

    const source = pull.values(['a', 'b', 'c'], error);
    const sink = find(test, cb);

    source(null, (end: any, data: any) => {
      if (end) return;
      sink(null, data);
    });
  });
});
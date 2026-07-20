import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink', () => {
  it('should handle error callback with err === true correctly', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const sink = find(test, cb);
    sink.abort(true);
  });
});
import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import through from "../../../../../../../../../../../subject_repositories/pull-stream/sources/through.js";

describe('find sink', () => {
  it('should handle error callback with err === true correctly', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = through();
    const sink = find(test, cb);
    source.pipe(sink);
    source.end(true); // Pass true as error to trigger the mutation
  });
});
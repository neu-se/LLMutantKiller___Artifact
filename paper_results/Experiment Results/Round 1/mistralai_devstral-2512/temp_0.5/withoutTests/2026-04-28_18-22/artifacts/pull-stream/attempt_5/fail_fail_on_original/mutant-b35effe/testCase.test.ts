import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/readable.js";

describe('find sink', () => {
  it('should handle error callback with err === true correctly', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = values([true]);
    pull(source, find(test, cb));
  });
});
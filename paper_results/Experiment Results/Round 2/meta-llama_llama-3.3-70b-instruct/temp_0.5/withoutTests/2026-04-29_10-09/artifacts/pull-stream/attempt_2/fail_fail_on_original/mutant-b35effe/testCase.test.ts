import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error correctly', (done) => {
    const error = true;
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };
    const test = () => true;
    const stream = findModule.default(test, callback);
    stream.error(error);
  });
});
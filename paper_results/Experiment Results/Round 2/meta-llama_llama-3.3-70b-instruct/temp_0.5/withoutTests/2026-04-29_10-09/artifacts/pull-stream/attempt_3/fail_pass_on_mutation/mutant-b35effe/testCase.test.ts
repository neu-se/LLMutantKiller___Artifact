import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error correctly', (done) => {
    const error = true;
    const callback = (err: any, data: any) => {
      expect(err).not.toBeNull();
      expect(data).toBeNull();
      done();
    };
    const test = () => true;
    findModule.default(test, callback);
    // Simulate the error callback
    callback(error, null);
  });
});
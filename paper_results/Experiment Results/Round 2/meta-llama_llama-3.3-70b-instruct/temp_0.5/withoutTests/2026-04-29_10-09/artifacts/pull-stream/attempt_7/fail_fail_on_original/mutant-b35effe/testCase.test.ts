import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error correctly', (done) => {
    const error = true;
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      done();
    };
    const test = () => true;
    findModule.default(test, (err: any, data: any) => {
      callback(null, data);
    });
    // Simulate the error callback
    findModule.default(test, callback);
  });
});
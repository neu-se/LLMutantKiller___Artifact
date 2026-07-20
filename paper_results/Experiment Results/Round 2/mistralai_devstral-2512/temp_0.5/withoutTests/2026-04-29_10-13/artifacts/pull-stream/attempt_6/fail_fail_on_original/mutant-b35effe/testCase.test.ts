const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find sink mutation test', () => {
  it('should handle error callback correctly when err is true', (done) => {
    const error = true;
    const callback = (err: any, data: any) => {
      try {
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    };

    // Create a mock sink that will be passed to the find function
    const mockSink = {
      write: (data: any) => {},
      end: (err: any) => {
        // This will trigger the error handler in find
        callback(err, null);
      }
    };

    const findSink = find(() => false, callback);
    // Call the findSink with null (read) and our mock sink
    findSink(null, mockSink);
    // Trigger the error path by calling end with true
    mockSink.end(error);
  });
});
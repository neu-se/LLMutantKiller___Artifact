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

    // Create a mock source that will call the sink's end method with true
    const mockSource = {
      pipe: (sink: any) => {
        // Immediately end with error = true
        sink.end(error);
        return mockSource;
      }
    };

    const findSink = find(() => false, callback);
    mockSource.pipe(findSink);
  });
});
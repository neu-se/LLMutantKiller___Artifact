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

    const mockSink = {
      write: (data: any) => {},
      end: (err: any) => {
        // This simulates the error path in the find sink
        const errorHandler = (find as any).__errorHandler;
        if (errorHandler) {
          errorHandler(err);
        }
      }
    };

    const findSink = find(() => false, callback);
    (findSink as any)(null, mockSink);

    // Trigger the error path
    mockSink.end(error);
  });
});
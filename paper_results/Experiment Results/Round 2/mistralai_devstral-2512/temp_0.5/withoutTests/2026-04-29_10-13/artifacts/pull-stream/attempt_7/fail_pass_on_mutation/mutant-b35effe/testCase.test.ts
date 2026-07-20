const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find sink mutation test', () => {
  it('should handle error callback correctly when err is true', (done) => {
    const error = true;
    let callbackCalled = false;

    const callback = (err: any, data: any) => {
      callbackCalled = true;
      try {
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    };

    // Create a mock read function that will end immediately
    const mockRead = (abort: any, cb: any) => {
      cb(true); // End the stream immediately
    };

    // Create a mock sink that will be passed to the find function
    const mockSink = {
      write: (data: any) => {},
      end: (err: any) => {
        if (!callbackCalled) {
          callback(err, null);
        }
      }
    };

    const findSink = find(() => false, callback);
    // Call the findSink with our mock read and mock sink
    findSink(mockRead, mockSink);
  });
});
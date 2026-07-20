const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find sink mutation test', () => {
  it('should handle error callback correctly when err is true', (done) => {
    const error = true;
    const callback = (err: any, data: any) => {
      try {
        // Original code: cb(err === true ? null : err, null)
        // Mutated code: cb(err !== true ? null : err, null)
        // When err is true:
        // Original passes null as first arg, mutated passes true as first arg
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    };

    // Create a mock read function that will end with error = true
    const mockRead = (abort: any, cb: any) => {
      cb(true, error); // End the stream with error = true
    };

    // Create a mock sink
    const mockSink = {
      write: (data: any) => {},
      end: (err: any) => {}
    };

    const findSink = find(() => false, callback);
    findSink(mockRead, mockSink);
  });
});
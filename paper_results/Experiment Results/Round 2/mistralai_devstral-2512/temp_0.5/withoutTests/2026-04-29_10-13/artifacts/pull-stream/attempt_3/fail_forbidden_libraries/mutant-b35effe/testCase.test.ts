const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");
const pull = require("pull-stream");

describe('find sink mutation test', () => {
  it('should handle error callback correctly when err is true', (done) => {
    const error = true;
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = pull.values([1, 2, 3]);
    const findSink = find(() => false, callback);

    pull(
      source,
      findSink
    );

    // Simulate error by ending the stream with true
    setImmediate(() => {
      findSink(null, true);
    });
  });
});
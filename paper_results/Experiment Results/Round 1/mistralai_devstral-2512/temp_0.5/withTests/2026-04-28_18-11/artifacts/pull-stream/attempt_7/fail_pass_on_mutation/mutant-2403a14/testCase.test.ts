const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('through onEnd behavior', () => {
  it('should call onEnd with null when abort is true', (done) => {
    let onEndCalledWith: any = null;
    const onEnd = (value: any) => {
      onEndCalledWith = value;
    };

    const source = pull([1, 2, 3]);
    const throughStream = through(null, onEnd);

    const read = pull(
      source,
      throughStream,
      drain(null, () => {})
    );

    read(null, () => {});
    read(true, () => {
      setImmediate(() => {
        expect(onEndCalledWith).toBeNull();
        done();
      });
    });
  });
});
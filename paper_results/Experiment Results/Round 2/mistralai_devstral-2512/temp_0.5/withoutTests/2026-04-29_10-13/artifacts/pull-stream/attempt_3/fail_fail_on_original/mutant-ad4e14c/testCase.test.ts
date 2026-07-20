const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with the correct abort value when stream ends with true', (done) => {
    let onEndCalledWith: any = null;
    const onEnd = (value: any) => {
      onEndCalledWith = value;
    };

    const op = (data: any) => {};

    const source = (end: any, cb: (end: any, data: any) => void) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    };

    const throughStream = through(op, onEnd);
    const read = throughStream(source);

    // End the stream with true
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeNull();
      // In original code, onEnd should be called with true
      // In mutated code, onEnd will be called with false (due to false ? null : abort)
      expect(onEndCalledWith).toBe(true);
      done();
    });
  });
});
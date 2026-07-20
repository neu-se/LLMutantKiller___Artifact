const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with null when stream ends with true', (done) => {
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
      // In original code: onEnd(true === true ? null : true) → onEnd(null)
      // In mutated code: onEnd(false ? null : true) → onEnd(true)
      expect(onEndCalledWith).toBeNull();
      done();
    });
  });
});
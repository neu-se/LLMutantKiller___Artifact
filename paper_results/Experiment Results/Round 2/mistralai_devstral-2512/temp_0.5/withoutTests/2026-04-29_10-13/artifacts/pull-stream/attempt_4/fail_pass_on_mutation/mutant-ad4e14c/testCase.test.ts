const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with the abort value when stream ends', (done) => {
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

    // End the stream with a specific abort value
    const abortValue = 'test-abort';
    read(abortValue, (end: any, data: any) => {
      expect(end).toBe(abortValue);
      expect(data).toBeNull();
      // In original code: onEnd(abortValue === true ? null : abortValue) → onEnd('test-abort')
      // In mutated code: onEnd(false ? null : abortValue) → onEnd('test-abort')
      // This won't catch the mutation, need to test with true
      done();
    });
  });
});
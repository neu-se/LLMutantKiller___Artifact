const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with the correct value when stream ends with non-true value', (done) => {
    let onEndCalledWith: unknown;
    const onEnd = (value: unknown) => {
      onEndCalledWith = value;
    };

    const transform = through(null, onEnd);
    const mockRead = (end: unknown, cb: (end: unknown, data: unknown) => void) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    };

    const read = transform(mockRead);
    read('end-value', (end: unknown, data: unknown) => {
      expect(onEndCalledWith).toBe('end-value');
      done();
    });
  });
});
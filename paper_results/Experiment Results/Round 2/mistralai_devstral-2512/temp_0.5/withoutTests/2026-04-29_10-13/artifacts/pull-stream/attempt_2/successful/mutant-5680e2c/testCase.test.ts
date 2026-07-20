const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with null when stream ends with true', (done) => {
    let onEndCalled = false;
    const onEnd = (value: any) => {
      onEndCalled = true;
      if (value !== null) {
        done(new Error(`Expected onEnd to be called with null, but got ${value}`));
      } else {
        done();
      }
    };

    const transform = through(null, onEnd);
    const mockRead = (end: any, cb: (end: any, data: any) => void) => {
      if (end) {
        cb(end, null);
      } else {
        cb(null, 'data');
      }
    };

    const read = transform(mockRead);
    read(true, (end: any, data: any) => {
      if (!onEndCalled) {
        done(new Error('onEnd was not called'));
      }
    });
  });
});
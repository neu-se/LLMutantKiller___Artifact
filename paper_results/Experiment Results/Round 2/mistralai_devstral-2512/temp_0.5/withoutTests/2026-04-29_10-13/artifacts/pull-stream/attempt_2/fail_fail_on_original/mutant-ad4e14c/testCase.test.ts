const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through stream end behavior', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
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

    // First call to read (not ending)
    read(null, (end: any, data: any) => {
      expect(data).toBe('data');
      expect(end).toBeNull();
    });

    // Second call to read (ending with abort value)
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeNull();
      expect(onEndCalledWith).toBe(true);
      done();
    });
  });
});
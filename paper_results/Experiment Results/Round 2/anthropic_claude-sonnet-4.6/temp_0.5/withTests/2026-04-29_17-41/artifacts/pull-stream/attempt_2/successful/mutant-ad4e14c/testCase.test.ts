import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through onEnd with normal stream end', () => {
  it('should call onEnd with null when stream ends normally (abort === true)', (done) => {
    let onEndArg: any = 'not-called';

    const onEnd = (err: any) => {
      onEndArg = err;
    };

    const throughStream = through(null, onEnd);

    // Source that ends immediately with true (normal end)
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(end);
        return;
      }
      cb(true, null); // normal end of stream
    };

    const read = throughStream(source);

    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      // Original: onEnd(true === true ? null : true) => onEnd(null)
      // Mutated:  onEnd(false ? null : true)         => onEnd(true)
      expect(onEndArg).toBeNull();
      done();
    });
  });
});
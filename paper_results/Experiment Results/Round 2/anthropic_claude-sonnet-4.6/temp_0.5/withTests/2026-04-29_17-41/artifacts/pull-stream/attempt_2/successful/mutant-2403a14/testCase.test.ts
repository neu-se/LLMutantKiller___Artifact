import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback receives null on normal stream end", () => {
  it("should call onEnd with null when the stream ends normally (abort === true)", (done) => {
    let onEndArg: any = "not-called";

    const onEnd = (err: any) => {
      onEndArg = err;
    };

    const tr = through(null, onEnd);

    // Source that ends immediately on first read
    const source = (abort: any, cb: Function) => {
      cb(true); // signal end of stream
    };

    const readable = tr(source);

    readable(null, (end: any, _data: any) => {
      // At this point onEnd should have been called with null (original)
      // but with true (mutant)
      expect(onEndArg).toBeNull();
      done();
    });
  });
});
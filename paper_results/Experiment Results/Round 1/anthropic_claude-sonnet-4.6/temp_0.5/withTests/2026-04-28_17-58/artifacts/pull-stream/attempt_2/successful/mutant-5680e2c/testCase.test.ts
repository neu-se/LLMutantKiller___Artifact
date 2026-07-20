import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    let onEndArg: any = undefined;
    let onEndCalled = false;

    const onEnd = (err: any) => {
      onEndCalled = true;
      onEndArg = err;
    };

    const throughStream = through(null, onEnd);

    // Source that yields one item then ends
    let count = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      if (count === 0) {
        count++;
        cb(null, 42);
      } else {
        // Normal end: abort === true
        cb(true);
      }
    };

    const read = throughStream(source);

    // First read: get the value
    read(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(42);

      // Second read: triggers normal end (abort === true from source)
      read(null, (end2: any, data2: any) => {
        expect(end2).toBe(true);
        // onEnd should have been called with null (normal stream end)
        expect(onEndCalled).toBe(true);
        expect(onEndArg).toBe(null);
        done();
      });
    });
  });
});
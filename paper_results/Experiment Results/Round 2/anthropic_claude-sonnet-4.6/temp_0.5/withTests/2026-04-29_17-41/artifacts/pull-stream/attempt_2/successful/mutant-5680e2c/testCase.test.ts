import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally, not with the abort=true value", (done) => {
    const onEndArgs: any[] = [];

    const onEnd = (err: any) => {
      onEndArgs.push(err);
    };

    const throughStream = through(null, onEnd);

    // Source that yields one item then ends
    let i = 0;
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(end);
        return;
      }
      if (i === 0) {
        i++;
        cb(null, "hello");
      } else {
        cb(true); // normal end
      }
    };

    const readable = throughStream(source);

    // First read gets data
    readable(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe("hello");

      // Second read hits end of stream
      readable(null, (end2: any, data2: any) => {
        expect(end2).toBe(true);

        // onEnd should have been called with null (original behavior)
        // mutated code would call onEnd(true) instead of onEnd(null)
        expect(onEndArgs.length).toBe(1);
        expect(onEndArgs[0]).toBeNull();
        done();
      });
    });
  });
});
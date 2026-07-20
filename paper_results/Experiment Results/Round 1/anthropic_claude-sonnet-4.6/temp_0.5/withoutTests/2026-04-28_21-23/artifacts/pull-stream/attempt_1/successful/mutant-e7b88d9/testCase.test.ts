import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take through - callback invocation on end/error", () => {
  it("should call the callback when the source stream ends during a read", (done) => {
    // Create a take that allows up to 10 items (more than source has)
    const takeThrough = take(10);

    // Create a source that ends immediately (has 0 items)
    const source = (end: any, cb: Function) => {
      if (end) {
        cb(end);
        return;
      }
      // Immediately signal end of stream
      cb(true);
    };

    const through = takeThrough(source);

    // Read from the through - source ends immediately
    // This should trigger the path where read returns end=true
    // and the through should call cb(true) to signal end
    through(false, (end: any, data: any) => {
      // The callback should be called with end=true
      expect(end).toBe(true);
      done();
    });
  });
});
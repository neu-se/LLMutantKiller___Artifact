import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not throw when stream ends normally (end === true) without a done callback", (done) => {
    // Create a simple source that ends immediately with end=true
    let readCount = 0;
    const source = (_abort: any, cb: (end: any, data?: any) => void) => {
      if (readCount === 0) {
        readCount++;
        cb(null, "data");
      } else {
        cb(true, null); // normal end
      }
    };

    // Suppress console.warn output during test
    const originalWarn = console.warn;
    console.warn = () => {};

    let threw = false;
    try {
      // No done callback supplied - this triggers the doneLackingErr path
      // With mutation: when end===true, else if(true || false) = true, so it throws
      // With original: when end===true, else if(true && false) = false, so it doesn't throw
      const sink = drain(null);
      sink(source);
    } catch (e) {
      threw = true;
    }

    console.warn = originalWarn;

    // Give async operations time to complete
    setTimeout(() => {
      expect(threw).toBe(false);
      done();
    }, 50);
  });
});
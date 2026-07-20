import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should return the first value when read is called without abort before the array processing begins", (done) => {
    let callCount = 0;
    const onAbort = jest.fn();
    
    const read = values([10, 20, 30], onAbort);

    // First call with null abort - should get value 10, not an abort
    read(null, (err: any, value: any) => {
      callCount++;
      // In original: err should be null, value should be 10
      // In mutated: abortCb is called with cb and null abort,
      // which will call cb(null) ending the stream immediately
      expect(err).toBeNull();
      expect(value).toBe(10);
      expect(onAbort).not.toHaveBeenCalled();
      done();
    });
  });
});
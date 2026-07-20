import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("partial sink behavior", () => {
  it("should throw when calling partial sink twice", (done) => {
    // Create a partial sink by passing a function with 1 argument
    const partialSink = pull((read: any) => {
      return function(end: any, cb: any) {
        read(end, cb);
      };
    });

    const source = (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
      }
    };

    const read = partialSink(source);

    // First call should work
    read(null, (end: any, data: any) => {
      expect(data).toBe(1);

      // Second call should throw in original code but not in mutated code
      expect(() => {
        read(null, (end: any, data: any) => {});
      }).toThrow("partial sink should only be called once!");

      done();
    });
  });
});
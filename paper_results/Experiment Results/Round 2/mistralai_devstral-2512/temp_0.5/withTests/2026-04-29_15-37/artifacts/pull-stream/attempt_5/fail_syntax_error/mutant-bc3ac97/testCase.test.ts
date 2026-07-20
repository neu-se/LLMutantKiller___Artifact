import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 3 arguments", () => {
  it("should correctly handle the case with 3 arguments in the curried function", (done) => {
    let callCount = 0;
    const expectedCallCount = 3;

    // Create a function that will be called with 3 arguments
    function testFunction(read: any) {
      callCount++;
      return function(end: any, cb: (end: any, data?: any) => void) {
        if (end) return cb(end);
        cb(null, callCount);
      };
    }

    // Create a simple source
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      cb(null, "start");
    }

    // Create a simple sink
    function sink(read: any) {
      return function(end: any, cb: (end: any, data?: any) => void) {
        read(end, (end: any, data: any) => {
          if (end) {
            expect(callCount).toBe(expectedCallCount);
            cb(end);
            done();
          } else {
            read(null, (end: any, data: any) => {
              if (end) {
                cb(end);
              } else {
                cb(null, data);
              }
            });
          }
        });
      });
    }

    // Test the pull function with 3 arguments
    pull(
      source,
      pull(testFunction, testFunction, testFunction),
      sink
    );
  });
});
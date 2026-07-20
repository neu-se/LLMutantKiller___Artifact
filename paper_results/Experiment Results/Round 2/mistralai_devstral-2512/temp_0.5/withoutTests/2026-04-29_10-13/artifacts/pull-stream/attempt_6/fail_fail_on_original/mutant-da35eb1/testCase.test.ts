import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink mutation test", () => {
  it("should handle error callback correctly when stream ends without match", (done) => {
    const testData = [1, 2, 3];
    let index = 0;

    const source = (abort: boolean, cb: (end: boolean, data?: number) => void) => {
      if (index >= testData.length) {
        cb(true);
      } else if (abort) {
        cb(true);
      } else {
        cb(false, testData[index++]);
      }
    };

    const testCondition = (x: number) => x > 10;
    const errorToPass = new Error("Test error");

    find(testCondition, (err: Error | null, result: number | null) => {
      try {
        expect(err).toBe(errorToPass);
        expect(result).toBeNull();
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    })(source);

    // Simulate an error by calling the callback with error
    process.nextTick(() => {
      source(true, (end, data) => {
        if (end) {
          // Directly call the error callback path
          find(testCondition, (err: Error | null, result: number | null) => {
            try {
              expect(err).toBe(errorToPass);
              expect(result).toBeNull();
              done();
            } catch (assertionError) {
              done(assertionError);
            }
          })(null, errorToPass);
        }
      });
    });
  });
});
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should call callback exactly once when stream ends normally", (done) => {
    let callbackCount = 0;
    const values = [1, 2, 3];
    let index = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (index < values.length) {
        cb(null, values[index++]);
      } else {
        cb(true);
      }
    };

    reduce(
      (acc: number, data: number) => acc + data,
      0,
      (err: any, result: any) => {
        callbackCount++;
        if (callbackCount === 1) {
          expect(err).toBeNull();
          expect(result).toBe(6);
          // Use setTimeout to check no second call comes
          setTimeout(() => {
            expect(callbackCount).toBe(1);
            done();
          }, 50);
        } else {
          done(new Error(`Callback called ${callbackCount} times`));
        }
      }
    )(source);
  });
});
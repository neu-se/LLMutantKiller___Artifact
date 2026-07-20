import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call the callback with the found item when test is a function", (done) => {
    const testFn = (data: any) => data === 42;
    const cb = (err: Error | null, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(42);
      done();
    };

    const source = {
      pipe: (dest: any) => {
        const values = [10, 20, 42, 30];
        let i = 0;
        const next = () => {
          if (i < values.length) {
            const shouldContinue = dest.write(values[i++]);
            if (shouldContinue) {
              setImmediate(next);
            }
          } else {
            dest.end();
          }
        };
        next();
        return dest;
      }
    };

    source.pipe(find(testFn, cb));
  });
});
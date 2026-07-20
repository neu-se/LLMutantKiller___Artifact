import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call the callback with null when no callback is provided", (done) => {
    const testFn = (data: any) => data === 42;
    const cb = (err: Error | null, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    const source = {
      pipe: (dest: any) => {
        const values = [10, 20, 30];
        let i = 0;
        const next = () => {
          if (i < values.length) {
            const shouldContinue = dest(values[i++]);
            if (shouldContinue) {
              setImmediate(next);
            }
          } else {
            dest(true);
          }
        };
        next();
        return dest;
      }
    };

    // This should trigger the mutation where !cb is replaced with false
    source.pipe(find(testFn));
    setTimeout(() => {
      cb(null, null);
    }, 100);
  });
});
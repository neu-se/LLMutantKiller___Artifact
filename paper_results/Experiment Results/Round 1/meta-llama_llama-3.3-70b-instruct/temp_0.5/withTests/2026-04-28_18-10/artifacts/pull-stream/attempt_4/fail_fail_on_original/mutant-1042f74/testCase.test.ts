import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle mutation in drain function', () => {
    const readCount = 5;
    let count = 0;

    const done = jest.fn();

    const source = () => {
      return (abort, cb) => {
        if (count >= readCount) return cb(true);
        count++;
        cb(null, count);
      };
    };

    const drainStream = drain(
      () => true,
      done
    );

    const read = drainStream(source());

    read(null, () => {});
    read(null, () => {});
    read(null, () => {});
    read(null, () => {});
    read(null, () => {});

    expect(count).toBe(readCount);
    expect(done).toHaveBeenCalledTimes(1);
  });
});
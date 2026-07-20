import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle mutation in drain function', () => {
    const readCount = 5;
    let count = 0;

    const done = jest.fn();

    const source = () => {
      let i = 0;
      return (abort: any, cb: (end: any, data: any) => void) => {
        if (abort) return cb(abort);
        if (i >= readCount) return cb(true);
        cb(null, i++);
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

    expect(count).toBe(0);
    expect(done).toHaveBeenCalledTimes(1);
  });
});
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle mutation in drain function', () => {
    const readCount = 5;
    let count = 0;

    const done = jest.fn();

    const drainStream = drain(
      () => {
        if (count >= readCount) return false;
        count++;
        return true;
      },
      done
    );

    for (let i = 0; i < readCount; i++) {
      drainStream(null, () => {});
    }

    expect(count).toBe(readCount);
    expect(done).toHaveBeenCalledTimes(0);
  });
});
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when no done callback is supplied and stream ends with an error', () => {
    const read = () => {
      return (abort: any, cb: any) => {
        cb(new Error('Test error'));
      };
    };

    const sink = drain(null, null);
    expect(() => sink(read)).toThrow();
  });
});
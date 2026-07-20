import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when no done callback is supplied', () => {
    const read = () => {
      return (abort: any, cb: any) => {
        cb(null, 'data');
      };
    };

    expect(() => drain(null, null)).toThrow();
  });
});
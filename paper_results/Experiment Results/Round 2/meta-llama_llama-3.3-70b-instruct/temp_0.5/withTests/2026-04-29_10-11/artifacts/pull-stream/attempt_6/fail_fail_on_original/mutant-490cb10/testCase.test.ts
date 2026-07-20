import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when no done callback is supplied and an error occurs in the mutated code', () => {
    const read = () => {
      return (abort: any, cb: any) => {
        cb(new Error('Test error'));
      };
    };

    const sink = drain(() => {}, null);
    expect(() => {
      sink(read);
      sink(read);
    }).toThrowError('no done callback supplied');
  });
});
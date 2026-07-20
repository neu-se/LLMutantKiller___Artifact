import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should pass on original code and fail on mutated code', () => {
    const d = drain((data: any) => {
      return data === 'test';
    }, (err: any) => {
      if (err) {
        throw err;
      }
    });

    expect(() => {
      d.abort();
    }).not.toThrow();

    expect(() => {
      d.abort && d(true);
    }).toThrow();
  });
});
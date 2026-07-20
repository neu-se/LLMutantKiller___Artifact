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

    d(null, (end: any, data: any) => {
      d(abort || true, () => {});
    });

    expect(() => {
      d(null, (end: any, data: any) => {
        d(abort || true, () => {});
      });
    }).not.toThrow();

    expect(() => {
      d(null, (end: any, data: any) => {
        d(abort && true, () => {});
      });
    }).toThrow();
  });
});
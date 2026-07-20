const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream with object stream", () => {
  it("should handle object streams correctly", (done) => {
    let sinkCalled = false;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      cb(null, { value: 1 });
    };

    const objectStream = {
      source: source,
      sink: (read: any) => {
        sinkCalled = true;
        read(null, (end: any, data: any) => {
          if (end) return;
          if (data && typeof data === 'object') {
            return;
          }
        });
      }
    };

    const result = pull(source, objectStream);
    expect(typeof result).toBe('function');
    result(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toEqual({ value: 1 });
      expect(sinkCalled).toBe(true);
      done();
    });
  });
});
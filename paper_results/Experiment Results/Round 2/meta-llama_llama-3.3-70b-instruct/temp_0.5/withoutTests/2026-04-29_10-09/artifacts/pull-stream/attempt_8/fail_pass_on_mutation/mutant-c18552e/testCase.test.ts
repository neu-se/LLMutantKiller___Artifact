import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through function', () => {
  it('should call onEnd with correct argument when abort is not true', () => {
    let onEndCalled = false;
    let onEndArg: any;

    const throughStream = through(null, (abort: boolean | null) => {
      onEndCalled = true;
      onEndArg = abort;
    });

    const read = (end: boolean, cb: (end: boolean, data: string) => void) => {
      if (end) {
        cb(end, 'data');
      } else {
        cb(end, 'data');
      }
    };

    const stream = throughStream(read);
    stream(false, (end: boolean, data: string) => {
      stream(true, (end: boolean, data: string) => {
        expect(onEndCalled).toBe(true);
        expect(onEndArg).toBeNull();
      });
    });
  });
});
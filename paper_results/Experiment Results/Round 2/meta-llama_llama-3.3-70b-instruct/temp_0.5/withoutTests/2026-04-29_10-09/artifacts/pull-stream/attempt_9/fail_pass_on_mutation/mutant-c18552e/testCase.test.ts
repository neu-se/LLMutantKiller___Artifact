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
      cb(end, 'data');
    };

    const stream = throughStream(read);
    stream(false, (end: boolean, data: string) => {
      stream(true, (end: boolean, data: string) => {
        expect(onEndCalled).toBe(true);
        expect(onEndArg).toBeNull();
      });
    });

    const throughStream2 = through(null, (abort: boolean | null) => {
      onEndCalled = true;
      onEndArg = abort;
    });

    const stream2 = throughStream2(read);
    stream2(true, (end: boolean, data: string) => {
      expect(onEndCalled).toBe(true);
      expect(onEndArg).toBeNull();
    });

    const throughStream3 = through(null, (abort: boolean | null) => {
      onEndCalled = true;
      onEndArg = abort;
    });

    const stream3 = throughStream3(read);
    stream3(true, (end: boolean, data: string) => {
      expect(onEndCalled).toBe(true);
      expect(onEndArg).toBeNull();
    });
  });
});
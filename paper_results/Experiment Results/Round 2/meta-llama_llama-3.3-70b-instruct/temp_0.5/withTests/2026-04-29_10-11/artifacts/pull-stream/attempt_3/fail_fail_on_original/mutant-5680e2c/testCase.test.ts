import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const stream = through(
      (data: any) => data,
      (abort: any) => {
        if (abort === true) return;
        if (abort !== null) throw new Error('Expected abort to be null or true');
      }
    );
    const read = stream((end: any, cb: any) => {
      cb(null, 1);
    });
    read(null, (end: any, data: any) => {
      expect(end).toBe(null);
    });
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
    });
  });
});
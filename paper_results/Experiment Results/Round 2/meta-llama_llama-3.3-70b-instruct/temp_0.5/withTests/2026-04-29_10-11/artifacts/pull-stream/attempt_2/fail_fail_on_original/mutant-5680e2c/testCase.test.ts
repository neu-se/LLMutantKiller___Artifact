import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const originalThrough = through(
      (data: any) => data,
      (abort: boolean) => {
        if (abort === true) return;
        throw new Error('Expected abort to be true');
      }
    );
    const read = originalThrough((end: any, cb: any) => {
      cb(null, 1);
    });
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
    });
  });
});
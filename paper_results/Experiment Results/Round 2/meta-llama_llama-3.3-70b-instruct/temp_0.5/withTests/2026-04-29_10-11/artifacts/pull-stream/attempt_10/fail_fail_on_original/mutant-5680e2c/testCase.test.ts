import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const onEnd = jest.fn();
    const stream = through(null, onEnd);
    const read = stream((end: any, cb: any) => {
      cb(null, 1);
    });
    read(false, (end: any, data: any) => {
      expect(end).toBe(null);
      read(true, (end: any, data: any) => {
        expect(end).toBe(true);
        expect(onEnd).toHaveBeenCalledTimes(1);
        expect(onEnd).toHaveBeenCalledWith(null);
      });
    });
  });
});
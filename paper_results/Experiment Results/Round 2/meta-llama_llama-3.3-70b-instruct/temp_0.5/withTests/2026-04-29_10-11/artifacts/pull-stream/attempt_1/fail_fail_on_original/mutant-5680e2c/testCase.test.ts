import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const originalThrough = through(null, (abort: any) => {
      if (abort !== true) throw new Error('Expected abort to be true');
    });
    const read = originalThrough(null);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
    });
    expect(() => read(true, (end: any, data: any) => {
      expect(end).toBe(true);
    })).toThrowError('Expected abort to be true');
  });
});
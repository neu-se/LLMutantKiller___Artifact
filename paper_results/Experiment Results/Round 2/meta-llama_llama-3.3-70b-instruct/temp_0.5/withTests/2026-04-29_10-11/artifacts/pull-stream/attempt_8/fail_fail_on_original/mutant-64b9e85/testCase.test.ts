import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    const read = find((d: any) => d === 2, (err: any, data: any) => {
      if (err) throw err;
      expect(data).toBe(2);
    });
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 2);
    };
    read(source, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(2);
    });
  });
});
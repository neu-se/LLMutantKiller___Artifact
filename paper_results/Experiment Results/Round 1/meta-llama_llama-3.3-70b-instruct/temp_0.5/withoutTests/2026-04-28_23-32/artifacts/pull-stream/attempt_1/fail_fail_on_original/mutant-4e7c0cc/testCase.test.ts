import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    const read = (err, cb) => cb(null, 'test');
    const sink1 = (read) => (err, cb) => cb(null, 'test1');
    const sink2 = (read) => (err, cb) => cb(null, 'test2');
    const sink3 = (read) => (err, cb) => cb(null, 'test3');
    const sink4 = (read) => (err, cb) => cb(null, 'test4');

    const result = pull(read, sink1, sink2, sink3, sink4);
    expect(result).toBe('test4');
  });
});
import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find function', () => {
  it('should call the callback with the first matching element', (done) => {
    const test = (d: any) => d === 7;
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(7);
      done();
    };
    find(test, cb)(null, (end: any, data: any) => {
      if (end) return cb(end);
      if (data === 7) return cb(null, data);
      cb(null, data);
    })(null, (end: any, data: any) => {
      if (end) return cb(end);
      cb(null, data);
    });
    find(test, cb)(null, (end: any, data: any) => {
      if (end) return cb(end);
      cb(null, data);
    })(null, (end: any, data: any) => {
      if (end) return cb(end);
      cb(null, data);
    });
  });
});
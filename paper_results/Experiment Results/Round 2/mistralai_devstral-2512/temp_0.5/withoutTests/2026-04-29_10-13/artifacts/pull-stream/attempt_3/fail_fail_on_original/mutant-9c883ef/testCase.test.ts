import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find', () => {
  it('should call the callback with the matching data when test is a function and cb is provided', (done) => {
    const test = (data: any) => data === 'target';
    const cb = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe('target');
      done();
    };

    const source = {
      read: (readCb: (err?: any, data?: any) => void) => {
        readCb(null, 'target');
      }
    };

    find(test, cb)(source);
  });
});
import reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce', () => {
  it('should pass error to callback when source errors immediately on first read', (done) => {
    const ERR = new Error('source error');
    const source = (_abort: any, cb: Function) => {
      cb(ERR);
    };
    const sink = reduce((acc: any, data: any) => data, 0, (err: any, val: any) => {
      expect(err).toBe(ERR);
      done();
    });
    sink(source);
  });
});
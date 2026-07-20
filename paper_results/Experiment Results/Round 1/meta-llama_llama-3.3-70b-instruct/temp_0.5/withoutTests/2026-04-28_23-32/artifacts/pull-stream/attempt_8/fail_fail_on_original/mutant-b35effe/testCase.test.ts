import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error callback correctly', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      if (err!== null && err!== true) {
        throw new Error('Expected error to be null or true');
      }
      if (data!== null) {
        throw new Error('Expected data to be null');
      }
      done();
    };

    const source = {
      read: (end: any, cb: (end: any, data: any) => void) => {
        cb(true, null);
      },
    };

    const findFunction = find(test, cb);
    findFunction(source);
  });
});
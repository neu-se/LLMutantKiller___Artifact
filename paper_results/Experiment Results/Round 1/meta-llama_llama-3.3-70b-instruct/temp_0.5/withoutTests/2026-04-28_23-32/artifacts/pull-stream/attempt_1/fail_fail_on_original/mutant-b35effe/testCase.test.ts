import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error callback correctly', (done) => {
    const test = (data: any) => false;
    const cb = (err: any, data: any) => {
      if (err !== null) {
        throw new Error('Expected error to be null');
      }
      if (data !== null) {
        throw new Error('Expected data to be null');
      }
      done();
    };

    const source = {
      once: (event: string, callback: (data: any) => void) => {
        if (event === 'error') {
          callback(true);
        }
      },
    };

    find(test, cb)(source);
  });
});
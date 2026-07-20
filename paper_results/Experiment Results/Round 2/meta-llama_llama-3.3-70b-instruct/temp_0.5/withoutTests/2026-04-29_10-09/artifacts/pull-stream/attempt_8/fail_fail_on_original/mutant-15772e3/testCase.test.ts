import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter function', () => {
  it('should correctly handle asynchronous data processing', (done) => {
    const testFunction = (data: any) => data !== null;
    const read = () => {
      let index = 0;
      return (end: any, cb: any) => {
        if (index === 0) {
          cb(false, null);
          index++;
        } else if (index === 1) {
          cb(false, 'data');
          index++;
        } else {
          cb(true, null);
        }
      };
    };

    const next = filter(testFunction)(read());
    next(false, (end: any, data: any) => {
      if (end) {
        done();
      } else if (data === null) {
        next(false, (end: any, data: any) => {
          if (end) {
            done();
          } else if (data !== 'data') {
            done(new Error('Unexpected data received'));
          } else {
            done();
          }
        });
      } else {
        done(new Error('Unexpected data received'));
      }
    });
  });
});
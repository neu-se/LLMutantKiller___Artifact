import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter function', () => {
  it('should correctly handle asynchronous data processing', (done) => {
    const testFunction = (data: any) => data === 'data';
    const read = () => {
      let index = 0;
      return (end: any, cb: any) => {
        if (index === 0) {
          cb(false, 'data');
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
    let count = 0;
    next(false, (end: any, data: any) => {
      if (end) {
        if (count !== 2) {
          done(new Error('Expected two data elements'));
        } else {
          done();
        }
      } else if (data === 'data') {
        count++;
        next(false, (end: any, data: any) => {
          if (end) {
            if (count !== 2) {
              done(new Error('Expected two data elements'));
            } else {
              done();
            }
          } else if (data === 'data') {
            count++;
            next(false, (end: any, data: any) => {
              if (end) {
                done();
              } else {
                done(new Error('Unexpected data received'));
              }
            });
          } else {
            done(new Error('Unexpected data received'));
          }
        });
      } else {
        done(new Error('Unexpected data received'));
      }
    });
  });
});
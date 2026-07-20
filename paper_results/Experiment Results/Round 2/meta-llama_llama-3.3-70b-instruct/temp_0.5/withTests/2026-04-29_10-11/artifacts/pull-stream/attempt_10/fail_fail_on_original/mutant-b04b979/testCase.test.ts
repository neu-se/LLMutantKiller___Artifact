import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('asyncMap', () => {
  it('should handle identity function correctly', (done) => {
    const source = () => {
      return (read) => {
        return function (next) {
          read(null, (end, data) => {
            if (end) {
              next(end);
            } else {
              next(null, data);
            }
          });
        };
      };
    };

    const asyncMapStream = (map) => {
      return (read) => {
        return function (next) {
          read(null, (end, data) => {
            if (end) {
              next(end);
            } else {
              map(data, (err, data) => {
                if (err) {
                  next(err);
                } else {
                  next(null, data);
                }
              });
            }
          });
        };
      };
    };

    pull(
      source(),
      asyncMapStream((data, cb) => {
        cb(null, data);
      }),
      (read) => {
        return function (next) {
          read(null, (end, data) => {
            if (end) {
              next(end);
            } else {
              expect(data).toBe(1);
              done();
            }
          });
        };
      }
    )(source());
  });
});
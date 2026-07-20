import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle more than 4 arguments', () => {
    const read = pull(
      pull.values([1, 2, 3, 4, 5]),
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      }
    );

    let results = [];
    read(null, function (end, data) {
      if (end) return;
      results.push(data);
    });

    expect(results).toEqual([1, 2, 3, 4, 5]);
  });
});
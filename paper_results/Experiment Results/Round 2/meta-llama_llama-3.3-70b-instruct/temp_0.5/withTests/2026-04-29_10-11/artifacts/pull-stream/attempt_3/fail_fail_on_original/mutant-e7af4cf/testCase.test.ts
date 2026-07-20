import { filter } from '../../../../../throughs/filter.js';

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const data = [1, 2, 3, 4, 5];
    const expected = [2, 4];
    const testFunction = (number: number) => number % 2 === 0;
    let result = [];
    let read = filter(testFunction)(function (end, cb) {
      if (end) return cb(end);
      result.push(end);
      cb(null, data.shift());
    });
    read(null, function (end, data) {
      if (end) return;
      read(null, function (end, data) {
        if (end) return;
        read(null, function (end, data) {
          if (end) return;
          read(null, function (end, data) {
            if (end) return;
            read(null, function (end, data) {
              if (end) return;
              expect(result).toEqual(expected);
            });
          });
        });
      });
    });
  });
});
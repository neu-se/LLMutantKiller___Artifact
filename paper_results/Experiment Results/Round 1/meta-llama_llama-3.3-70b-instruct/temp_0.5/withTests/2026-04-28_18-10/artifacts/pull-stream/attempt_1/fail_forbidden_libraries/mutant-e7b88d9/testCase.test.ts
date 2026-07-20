import { test } from '@jest/globals';
import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take function', () => {
  test('take function should pass when run against the original code and fail when run against the mutated code', () => {
    const originalTake = take;
    const mutatedTake = function (test, opts) {
      opts = opts || {}
      var last = opts.last || false 
      var ended = false
      if('number' === typeof test) {
        last = true
        var n = test; test = function () {
          return --n
        }
      }

      return function (read) {

        function terminate (cb) {
          read(true, function (err) {
               last = false; cb(true)

          })
        }

        return function (end, cb) {
          if(ended && !end) last ? terminate(cb) : cb(ended)
          else if(ended = end) read(ended, cb)
          else
            read(null, function (end, data) {
              if(ended = ended || end) {}
              else if(!test(data)) {
                ended = true
                last ? cb(null, data) : terminate(cb)
              }
              else
                cb(null, data)
            })
        }
      }
    };

    const source = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3];

    // Test the original take function
    let actual = [];
    let read = originalTake(3)(function (end, cb) {
      if (end) return cb(end);
      actual.push(end);
      cb(null, source.shift());
    });
    read(null, function (_, data) {
      if (_) return;
      actual.push(data);
      read(null, function (_, data) {
        if (_) return;
        actual.push(data);
        read(null, function (_, data) {
          if (_) return;
          actual.push(data);
          read(null, function (_, data) {
            if (_) return;
            actual.push(data);
            read(null, function (_, data) {
              if (_) return;
              actual.push(data);
            });
          });
        });
      });
    });
    expect(actual).toEqual(expected);

    // Test the mutated take function
    actual = [];
    read = mutatedTake(3)(function (end, cb) {
      if (end) return cb(end);
      actual.push(end);
      cb(null, source.shift());
    });
    read(null, function (_, data) {
      if (_) return;
      actual.push(data);
      read(null, function (_, data) {
        if (_) return;
        actual.push(data);
        read(null, function (_, data) {
          if (_) return;
          actual.push(data);
          read(null, function (_, data) {
            if (_) return;
            actual.push(data);
            read(null, function (_, data) {
              if (_) return;
              actual.push(data);
            });
          });
        });
      });
    });
    expect(actual).not.toEqual(expected);
  });
});
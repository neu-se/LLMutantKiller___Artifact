import { test, expect } from '@jest/globals';
import { take } from '../../../throughs/take';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const originalTake = take;
    const mutatedTake = take;

    const originalResult = [];
    const mutatedResult = [];

    const source = [
      { value: 1, pass: true },
      { value: 2, pass: true },
      { value: 3, pass: false },
      { value: 4, pass: true },
      { value: 5, pass: true },
    ];

    originalTake(function (data: any) {
      return data.pass;
    }, { last: false })(function (read: any) {
      return function (end: any, cb: any) {
        if (end === true) return cb(end);
        if (end) return cb(end);
        read(null, function (end: any, data: any) {
          if (end) return cb(end);
          originalResult.push(data);
          read(null, cb);
        });
      };
    });

    mutatedTake(function (data: any) {
      return data.pass;
    }, { last: false })(function (read: any) {
      return function (end: any, cb: any) {
        if (end === true) return cb(end);
        if (end) return cb(end);
        read(null, function (end: any, data: any) {
          if (end) return cb(end);
          mutatedResult.push(data);
          read(null, cb);
        });
      };
    });

    source.forEach((item) => {
      originalTake(function (data: any) {
        return data.pass;
      }, { last: false })(function (read: any) {
        return function (end: any, cb: any) {
          if (end === true) return cb(end);
          if (end) return cb(end);
          read(null, function (end: any, data: any) {
            if (end) return cb(end);
            originalResult.push(data);
            read(null, cb);
          });
        };
      })(null, (err: any, data: any) => {
        if (err) throw err;
        if (data) originalResult.push(data);
      });

      mutatedTake(function (data: any) {
        return data.pass;
      }, { last: false })(function (read: any) {
        return function (end: any, cb: any) {
          if (end === true) return cb(end);
          if (end) return cb(end);
          read(null, function (end: any, data: any) {
            if (end) return cb(end);
            mutatedResult.push(data);
            read(null, cb);
          });
        };
      })(null, (err: any, data: any) => {
        if (err) throw err;
        if (data) mutatedResult.push(data);
      });
    });

    expect(originalResult).toEqual([{ value: 1, pass: true }, { value: 2, pass: true }]);
    expect(mutatedResult).toEqual([{ value: 1, pass: true }, { value: 2, pass: true }, { value: 3, pass: false }]);
  });
});
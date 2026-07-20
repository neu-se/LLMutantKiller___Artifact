import take from '../../../throughs/take.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const testStream = [
      { value: 1, pass: true },
      { value: 2, pass: true },
      { value: 3, pass: false },
      { value: 4, pass: true },
      { value: 5, pass: true },
    ];

    const read = (end: any, cb: any) => {
      if (end === true) return cb(end);
      if (end) return cb(end);
      const data = testStream.shift();
      if (!data) return cb(true);
      cb(null, data);
    };

    const takeStream = take(2, { last: false });

    const result: any[] = [];
    takeStream(read)(null, (end: any, data: any) => {
      if (end) return;
      if (data) result.push(data);
    });

    takeStream(read)(null, (end: any, data: any) => {
      if (end) return;
      if (data) result.push(data);
    });

    expect(result.length).toBe(2);
  });
});
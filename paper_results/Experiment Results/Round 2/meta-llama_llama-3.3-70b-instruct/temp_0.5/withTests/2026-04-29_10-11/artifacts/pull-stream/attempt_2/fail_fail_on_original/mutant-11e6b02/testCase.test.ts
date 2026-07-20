import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take', () => {
  it('should pass when last is false and should fail when last is true', () => {
    const testFunction = (data: any) => data < 5;
    const last = false;
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const read = take(testFunction, { last });
    let ended = false;
    let result: any[] = [];

    read(null, (end: any, data: any) => {
      if (end === true) {
        ended = true;
      } else if (end) {
        ended = end;
      } else {
        result.push(data);
      }
    });

    for (const value of values) {
      read(null, (end: any, data: any) => {
        if (end === true) {
          ended = true;
        } else if (end) {
          ended = end;
        } else {
          result.push(data);
        }
      });
    }

    expect(result).toEqual([1, 2, 3, 4]);
    expect(ended).toBe(true);
  });
});
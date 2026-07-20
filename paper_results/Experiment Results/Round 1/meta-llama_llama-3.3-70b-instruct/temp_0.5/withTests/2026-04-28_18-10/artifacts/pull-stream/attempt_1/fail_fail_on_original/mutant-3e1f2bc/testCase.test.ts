import { pull } from '../../../pull.js';

describe('pull-stream', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      (s: any) => {
        if (s && typeof s === 'object') {
          s.sink(read);
          read = s.source;
        }
      }
    );

    expect(read).toBeInstanceOf(Function);

    const result = [];
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });

    expect(result).toEqual([1, 2, 3]);
  });
});
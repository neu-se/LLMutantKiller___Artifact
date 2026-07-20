import pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('take', () => {
  it('should pass when last is false and should fail when last is true', () => {
    const test = (data: any) => data < 5;
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    pull(
      pull.values(values),
      pull.take(test, { last: false }),
      pull.collect((err: any, result: any[]) => {
        expect(result).toEqual([1, 2, 3, 4]);
      })
    );

    pull(
      pull.values(values),
      pull.take(test, { last: true }),
      pull.collect((err: any, result: any[]) => {
        expect(result.length).toBe(4); // This should fail on the mutated code
      })
    );
  });
});
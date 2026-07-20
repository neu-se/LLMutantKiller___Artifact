import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('take function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = [1, 2, 3, 4, 5];
    let count = 0;
    let result: any[] = [];

    pull(
      pull.values(source),
      pull.take(3),
      pull.collect((err: any, data: any) => {
        if (err) throw err;
        result = data;
      })
    );

    expect(result.length).toBe(3);
  });
});
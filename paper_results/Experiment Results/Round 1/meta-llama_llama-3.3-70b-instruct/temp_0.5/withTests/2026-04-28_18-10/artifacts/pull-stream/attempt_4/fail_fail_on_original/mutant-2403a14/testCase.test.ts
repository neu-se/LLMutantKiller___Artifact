import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = pull(
      pull.values([1, 2, 3]),
      pull.through(null, (abort: any) => {
        if (abort !== null && abort !== undefined) {
          throw new Error('Abort should be null or undefined when stream ends');
        }
      })
    );

    const result = await new Promise((resolve, reject) => {
      pull.collect(read, (err: any, data: any) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    expect(result).toEqual([1, 2, 3]);
  });
});
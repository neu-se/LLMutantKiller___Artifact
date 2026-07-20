import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const through = pull.through;
    const values = pull.values;
    const collect = pull.collect;

    if (typeof through !== 'function') {
      throw new Error('through is not a function');
    }

    if (typeof values !== 'function') {
      throw new Error('values is not a function');
    }

    if (typeof collect !== 'function') {
      throw new Error('collect is not a function');
    }

    const read = through(null, (abort: any) => {
      if (abort !== null && abort !== undefined) {
        throw new Error('Abort should be null or undefined when stream ends');
      }
    });

    const result = await new Promise((resolve, reject) => {
      collect(
        values([1, 2, 3]),
        read,
        (err: any, data: any) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    expect(result).toEqual([1, 2, 3]);
  });
});
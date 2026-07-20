import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = through(null, (abort: any) => {
      if (abort !== null) {
        throw new Error('Abort should be null when stream ends');
      }
    });

    const result = await new Promise((resolve, reject) => {
      collect(values([1, 2, 3]), (err: any, data: any) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    expect(result).toEqual([1, 2, 3]);
  });
});
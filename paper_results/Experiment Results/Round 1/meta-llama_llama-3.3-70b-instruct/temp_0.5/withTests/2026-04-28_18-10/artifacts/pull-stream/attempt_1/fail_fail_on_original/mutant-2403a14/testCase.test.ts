import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('through test', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const values = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];

    const read = through(null, (err) => {
      if (err) throw err;
    });

    const result = await new Promise((resolve, reject) => {
      collect(read, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    expect(result).toEqual(expected);
  });
});
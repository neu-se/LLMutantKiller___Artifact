import * as takeModule from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import * as valuesModule from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import * as collectModule from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const takeFunction = takeModule;
    const valuesFunction = valuesModule;
    const collectFunction = collectModule;
    const read = takeFunction(1, { last: true });
    const stream = valuesFunction([1, 2, 3]);
    const result = await new Promise((resolve, reject) => {
      collectFunction(stream, (err: any, data: any) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    expect(result).toEqual([1]);
  });
});
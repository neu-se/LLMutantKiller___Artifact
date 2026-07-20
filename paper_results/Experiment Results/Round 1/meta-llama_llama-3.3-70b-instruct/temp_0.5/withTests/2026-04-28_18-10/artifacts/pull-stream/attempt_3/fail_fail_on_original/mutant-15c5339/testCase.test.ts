import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import { collect } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const takeModule = require('../../../../../../../../../subject_repositories/pull-stream/throughs/take.js');
    const takeFunction = takeModule;
    const valuesModule = require('../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
    const collectModule = require('../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js');
    const read = takeFunction(1, { last: true });
    const stream = valuesModule();
    const result = await new Promise((resolve, reject) => {
      collectModule(stream, (err: any, data: any) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    expect(result).toEqual([1]);
  });
});
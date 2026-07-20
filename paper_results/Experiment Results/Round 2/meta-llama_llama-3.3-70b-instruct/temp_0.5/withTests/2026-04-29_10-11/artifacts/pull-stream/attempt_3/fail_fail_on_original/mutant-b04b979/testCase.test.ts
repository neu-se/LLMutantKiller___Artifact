import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should return undefined when map function is empty', (done) => {
    const source = asyncMap(function (data: any) {
      return data;
    });

    const read = source(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      } else if (data === undefined) {
        done();
      }
    });

    read(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      }
    });
  });
});
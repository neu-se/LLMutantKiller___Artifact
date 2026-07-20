import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';

describe('prop function behavior', () => {
  it('should return a function that accesses object properties when key is truthy', (done) => {
    const propFunc = pull.prop('testKey');
    const testData = { testKey: 'expectedValue' };

    pull(
      pull.values([testData]),
      pull.map(propFunc),
      pull.collect((err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(['expectedValue']);
        done();
      })
    );
  });
});
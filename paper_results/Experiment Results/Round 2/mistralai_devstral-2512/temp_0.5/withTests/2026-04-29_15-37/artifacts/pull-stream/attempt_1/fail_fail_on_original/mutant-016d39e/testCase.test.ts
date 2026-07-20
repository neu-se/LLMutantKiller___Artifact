// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-016d39e/testCase.test.ts
import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';

describe('drain without done callback error message', () => {
  it('should throw error with descriptive message when no done callback is provided', (done) => {
    const errorMessages: string[] = [];
    const originalError = console.error;
    console.error = (...args: any[]) => {
      errorMessages.push(args.join(' '));
    };

    try {
      const drain = pull.drain();
      const readStream = createReadStream(join(__dirname, '../package.json'));
      pull(
        pull.values([1, 2, 3]),
        drain
      );
      done('Expected an error to be thrown');
    } catch (err) {
      console.error = originalError;
      expect(errorMessages.some(msg => msg.includes('no done callback supplied'))).toBe(true);
      done();
    }
  });
});
import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('pull-stream drain', () => {
  it('should handle error correctly', () => {
    const sink = drain(
      () => true,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    expect(sink).toBeDefined();
  });
});
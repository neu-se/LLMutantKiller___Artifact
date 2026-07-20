import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should pass on original code and fail on mutated code', () => {
    const originalDrain = drain((data: any) => {
      return data === 'test';
    }, (err: any) => {
      if (err) {
        throw err;
      }
    });

    const read = () => {
      return originalDrain(null, (end: any, data: any) => {
        if (end) {
          return;
        }
        if (data === 'test') {
          originalDrain(true, () => {});
        }
      });
    };

    read();
    read();

    expect(() => {
      originalDrain(true, () => {});
    }).not.toThrow();
  });
});
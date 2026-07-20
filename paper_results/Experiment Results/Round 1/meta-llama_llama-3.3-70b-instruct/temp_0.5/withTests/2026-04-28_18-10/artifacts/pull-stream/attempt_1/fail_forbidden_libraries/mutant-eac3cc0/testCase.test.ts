import { drain } from '../../../../../subject_repositories/pull-stream/sinks/drain.js';
import { test, expect } from '@jest/globals';

describe('drain', () => {
  test('original code passes, mutated code fails', () => {
    const originalDrain = drain((data: any) => {
      return data === 'test';
    }, (err: any) => {
      expect(err).toBeUndefined();
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

    const mutatedDrain = drain((data: any) => {
      return data === 'test';
    }, (err: any) => {
      expect(err).toBeUndefined();
    });

    const mutatedRead = () => {
      return mutatedDrain(null, (end: any, data: any) => {
        if (end) {
          return;
        }
        if (data === 'test') {
          mutatedDrain(true && true, () => {});
        }
      });
    };

    mutatedRead();
    mutatedRead();

    expect(mutatedDrain(true, () => {})).not.toThrow();
  });
});
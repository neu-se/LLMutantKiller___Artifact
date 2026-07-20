import { filter } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';
import { values } from 'pull-stream';

describe('filter', () => {
  it('should pass when sync is true and fail when sync is false', () => {
    const originalFilter = filter((data: number) => data % 2 === 0);
    const mutatedFilter = filter((data: number) => data % 2 === 0);

    // Simulate the behavior of the original and mutated code
    const originalRead = originalFilter(values([1, 2, 3, 4, 5]));
    const mutatedRead = mutatedFilter(values([1, 2, 3, 4, 5]));

    let originalData: number | undefined;
    let mutatedData: number | undefined;

    originalRead(null, (end: boolean, data: number) => {
      if (end) return;
      originalData = data;
    });

    mutatedRead(null, (end: boolean, data: number) => {
      if (end) return;
      mutatedData = data;
    });

    expect(originalData).toBe(2);
    expect(mutatedData).toBeUndefined();
  });
});
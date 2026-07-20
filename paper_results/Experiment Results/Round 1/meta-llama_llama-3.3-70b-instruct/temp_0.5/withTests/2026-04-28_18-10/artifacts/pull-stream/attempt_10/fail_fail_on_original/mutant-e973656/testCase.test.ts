import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';
import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('drain', () => {
  it('should handle end condition correctly', () => {
    const valuesArray = [1, 2, 3, 4, 5];
    const done = jest.fn();
    const op = (data: any) => {
      if (data === 3) return false;
      return true;
    };
    drain(op, done)(values(valuesArray));
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});
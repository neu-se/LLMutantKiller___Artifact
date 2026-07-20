import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values function', () => {
  it('should return undefined when given undefined and call onAbort', (done) => {
    const onAbort = jest.fn();
    const read = values(undefined, onAbort);
    read(true, (end: any) => {
      expect(end).toBe(true);
      expect(onAbort).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
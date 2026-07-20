import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values function', () => {
  it('should call onAbort when given null and abort is true', (done) => {
    const onAbort = jest.fn();
    const read = values(null, onAbort);
    read(true, (end: any) => {
      expect(end).toBe(true);
      expect(onAbort).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
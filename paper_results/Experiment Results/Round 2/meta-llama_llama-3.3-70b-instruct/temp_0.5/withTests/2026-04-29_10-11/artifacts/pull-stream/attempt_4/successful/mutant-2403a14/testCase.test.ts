import through from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const onEnd = jest.fn();
    const read = through(null, onEnd);

    read(null, (end, data) => {
      read(false, (end, data) => {
        expect(onEnd).toHaveBeenCalledTimes(1);
        expect(onEnd).toHaveBeenCalledWith(null);
      });
    });
  });
});
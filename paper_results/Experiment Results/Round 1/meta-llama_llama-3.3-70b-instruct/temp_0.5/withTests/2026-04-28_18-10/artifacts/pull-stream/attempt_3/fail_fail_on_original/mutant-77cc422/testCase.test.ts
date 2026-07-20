import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('count function', () => {
  it('should call cb with next value when end is false', () => {
    const cb = jest.fn();
    const end = false;
    const read = pull(
      pull.count(10),
      pull.take(1),
      pull.collect((err, ary) => {
        expect(ary).toEqual([0]);
        expect(err).toBeNull();
      })
    );
    read(end, cb);
  });
});
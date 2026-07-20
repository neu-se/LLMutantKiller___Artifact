import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function with regex key', () => {
  it('should return the matched substring when using a regex key', (done) => {
    const testString = 'hello world 123';
    const regex = /(\d+)/;
    const getMatch = prop(regex);

    pull(
      pull.values([testString]),
      pull.map(getMatch),
      pull.collect((err: any, results: any) => {
        expect(err).toBeNull();
        expect(results).toEqual(['123']);
        done();
      })
    );
  });
});
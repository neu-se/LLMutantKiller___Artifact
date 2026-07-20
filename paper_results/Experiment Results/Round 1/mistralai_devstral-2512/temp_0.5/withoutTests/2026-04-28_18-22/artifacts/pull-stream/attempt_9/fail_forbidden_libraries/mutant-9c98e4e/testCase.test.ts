import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";
import pull from "pull-stream";

describe('count source', () => {
  it('should emit values from 0 to max-1 and end', (done) => {
    const max = 3;
    const results: number[] = [];

    pull(
      count(max),
      pull.collect((err, values) => {
        if (err) return done(err);
        expect(values).toEqual([0, 1, 2]);
        done();
      })
    );
  });
});
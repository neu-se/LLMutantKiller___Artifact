import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with 4 arguments', () => {
  it('should correctly handle 4 arguments in partial application', (done) => {
    const source = pull.values([1, 2, 3, 4]);
    const through1 = pull.through();
    const through2 = pull.through();
    const through3 = pull.through();
    const through4 = pull.through();

    pull(
      source,
      through1,
      through2,
      through3,
      through4,
      pull.collect((err, result) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual([1, 2, 3, 4]);
        done();
      })
    );
  });
});
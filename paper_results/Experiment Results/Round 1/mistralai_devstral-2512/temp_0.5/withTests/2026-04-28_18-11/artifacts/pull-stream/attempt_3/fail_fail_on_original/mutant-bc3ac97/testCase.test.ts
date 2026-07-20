import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import * as pullSources from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pullThroughs from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";
import * as pullSinks from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle 3 arguments in the pull function', (done) => {
    const input = [1, 2, 3];
    const expectedOutput = [2, 4, 6];

    pull(
      pullSources.values(input),
      pullThroughs.map((x: number) => x * 2),
      pullThroughs.map((x: number) => x),
      pullSinks.collect((err: any, result: number[]) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual(expectedOutput);
        done();
      })
    );
  });
});
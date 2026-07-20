import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import * as pullSources from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import * as pullThroughs from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";
import * as pullStreams from "../../../../../../../../../../../subject_repositories/pull-stream/streams/take.js";
import * as pullSinks from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('pull function with partial application', () => {
  it('should correctly handle partial application with multiple arguments', (done) => {
    const source = pullSources.values([1, 2, 3]);
    const map = pullThroughs.map((x: number) => x * 2);
    const take = pullStreams.take(2);

    // Create a partially applied pull function with multiple arguments
    const partialPull = pull(source, map, take);

    // The partialPull should be a function that can be called with a read function
    const read = partialPull(pullSinks.collect((err: any, result: number[]) => {
      expect(err).toBeNull();
      expect(result).toEqual([2, 4]);
      done();
    }));

    // Trigger the read
    read(null, () => {});
  });
});
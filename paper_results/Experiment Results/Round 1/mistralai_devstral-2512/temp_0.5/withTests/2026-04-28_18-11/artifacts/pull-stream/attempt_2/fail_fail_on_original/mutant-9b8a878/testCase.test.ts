import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should correctly handle partial application with multiple arguments', (done) => {
    const source = pull.values([1, 2, 3]);
    const map = pull.map((x: number) => x * 2);
    const take = pull.take(2);

    // Create a partially applied pull function with multiple arguments
    const partialPull = pull(source, map, take);

    // The partialPull should be a function that can be called with a read function
    const read = partialPull(pull.collect((err: any, result: number[]) => {
      expect(err).toBeNull();
      expect(result).toEqual([2, 4]);
      done();
    }));

    // Trigger the read
    read(null, () => {});
  });
});
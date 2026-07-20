import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    const source = pull.values([1, 2, 3]);
    const sink = pull.drain((data: any) => {
      expect(data).toBe(2);
    }, (err: any) => {
      if (err) throw err;
    });
    pull(
      source,
      pull.find((d: any) => d === 2),
      sink
    );
  });
});
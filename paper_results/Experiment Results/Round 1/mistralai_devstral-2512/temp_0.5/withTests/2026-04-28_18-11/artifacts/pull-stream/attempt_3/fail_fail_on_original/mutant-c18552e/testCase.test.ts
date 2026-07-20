const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior', () => {
  it('should call onEnd with the correct abort value when stream ends', (done) => {
    const onEnd = jest.fn();
    const source = pull.values([1, 2, 3]);
    const throughStream = through(null, onEnd);

    pull(
      source,
      throughStream,
      pull.collect((err: any, result: any) => {
        expect(result).toEqual([1, 2, 3]);
        expect(onEnd).toHaveBeenCalledTimes(1);
        expect(onEnd).toHaveBeenCalledWith(null);
        done();
      })
    );
  });
});
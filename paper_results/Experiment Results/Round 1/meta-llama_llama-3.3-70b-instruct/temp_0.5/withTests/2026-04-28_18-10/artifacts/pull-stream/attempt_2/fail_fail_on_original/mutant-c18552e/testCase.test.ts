import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe('through', () => {
  it('should call onEnd with null when abort is true', () => {
    let onEndCalledWithNull = false;
    const onEnd = (err: any) => {
      if (err === null) {
        onEndCalledWithNull = true;
      }
    };
    const throughStream = through(null, onEnd);
    const read = throughStream(function () {});
    read(true, function () {});
    expect(onEndCalledWithNull).toBe(true);
  });
});
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('through', () => {
  it('should call onEnd with null when abort is true', () => {
    let onEndCalledWithNull = false;
    const onEnd = (err: any) => {
      if (err === null) {
        onEndCalledWithNull = true;
      }
    };
    const throughStream = pull.through(null, onEnd);
    const read = throughStream(function (end: any, cb: any) {
      cb(end);
    });
    read(true, function (end: any, data: any) {
      expect(onEndCalledWithNull).toBe(true);
    });
  });
});
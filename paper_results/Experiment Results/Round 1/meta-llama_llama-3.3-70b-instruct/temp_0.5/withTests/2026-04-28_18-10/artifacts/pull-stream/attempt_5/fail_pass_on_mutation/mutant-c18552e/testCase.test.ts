import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('through', () => {
  it('should call onEnd with the correct abort value', () => {
    let onEndCalledWithValue = false;
    let onEndValue: any;
    const onEnd = (err: any) => {
      onEndValue = err;
      onEndCalledWithValue = true;
    };
    const throughStream = pull.through(null, onEnd);
    const read = throughStream(function (end: any, cb: any) {
      cb(end);
    });
    read(false, function (end: any, data: any) {
      expect(onEndCalledWithValue).toBe(false);
      read(true, function (end: any, data: any) {
        expect(onEndCalledWithValue).toBe(true);
        expect(onEndValue).toBeNull();
      });
    });
  });
});
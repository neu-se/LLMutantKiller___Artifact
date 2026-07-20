import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should emit array values in sequence and complete', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    let receivedValues: number[] = [];
    let completed = false;

    function next(abort: any, cb: (error: any, data?: any) => void) {
      source(abort, (end: any, data?: any) => {
        if (end === true) {
          completed = true;
          expect(receivedValues).toEqual([1, 2, 3]);
          expect(completed).toBe(true);
          done();
        } else if (end) {
          done(end);
        } else {
          receivedValues.push(data);
          setImmediate(() => next(null, cb));
        }
      });
    }

    next(null, () => {});
  });
});
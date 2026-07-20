import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should stop emitting when reaching max value', (done) => {
    const max = 2;
    const source = count(max);
    let receivedValues: number[] = [];
    let callCount = 0;

    source(null, (end: any, data: number) => {
      callCount++;
      if (end) {
        expect(receivedValues).toEqual([0, 1]);
        expect(callCount).toBe(3); // 2 data + 1 end
        done();
      } else {
        receivedValues.push(data);
        if (callCount > max + 1) {
          done(new Error(`Expected to stop at ${max} but continued`));
        }
      }
    });
  });
});
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should emit array values in order and complete', (done) => {
    const array = [1, 2, 3];
    const source = values(array);

    const results: number[] = [];
    const expected = [1, 2, 3];

    function read() {
      source(null, (end: boolean | null, data?: number) => {
        if (end === true) {
          expect(results).toEqual(expected);
          done();
        } else if (end === null && data !== undefined) {
          results.push(data);
          read();
        }
      });
    }

    read();
  });
});
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle array-like objects correctly', (done) => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const source = values(arrayLike);

    const results: any[] = [];
    source(null, (end, data) => {
      if (end) {
        expect(results).toEqual(['a', 'b', 'c']);
        done();
      } else {
        results.push(data);
      }
    });
  });
});
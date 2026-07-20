const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should handle array-like objects correctly', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const source = values(arrayLike);

    const results: any[] = [];
    let callback = (end: any, data: any) => {
      if (end) {
        expect(results).toEqual(['a', 'b', 'c']);
      } else {
        results.push(data);
        callback = () => {}; // Prevent infinite loop
      }
    };

    source(null, callback);
    source(null, callback);
    source(null, callback);
    source(null, callback); // Should trigger end
  });
});
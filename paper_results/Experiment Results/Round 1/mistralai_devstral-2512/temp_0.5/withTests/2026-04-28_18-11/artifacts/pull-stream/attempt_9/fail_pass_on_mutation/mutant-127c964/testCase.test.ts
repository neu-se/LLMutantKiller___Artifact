const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should not immediately end the stream when given an object', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const stream = values(input);
    let firstRead = true;

    // First read
    stream(null, (end: any, data: any) => {
      if (firstRead) {
        firstRead = false;
        expect(end).toBeNull();
        expect(data).toBe(1);

        // Second read - this should not immediately end
        stream(null, (end2: any, data2: any) => {
          expect(end2).toBeNull();
          expect(data2).toBe(2);

          // Third read - should get third value
          stream(null, (end3: any, data3: any) => {
            expect(end3).toBeNull();
            expect(data3).toBe(3);

            // Fourth read - should now end
            stream(null, (end4: any, data4: any) => {
              expect(end4).toBe(true);
              expect(data4).toBeUndefined();
              done();
            });
          });
        });
      }
    });
  });
});
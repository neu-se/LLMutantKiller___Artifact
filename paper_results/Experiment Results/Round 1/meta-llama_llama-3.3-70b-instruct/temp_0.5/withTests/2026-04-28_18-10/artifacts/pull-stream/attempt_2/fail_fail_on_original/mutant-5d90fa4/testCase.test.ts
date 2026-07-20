import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values";

describe('values function', () => {
  it('should return an empty array when given an empty array', (done) => {
    const array: any[] = [];
    const read = values(array);
    const result: any[] = [];
    read(null, (end: any, data: any) => {
      if (end === true) {
        expect(result).toEqual([]);
        done();
      } else {
        result.push(data);
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(result).toEqual([]);
            done();
          } else {
            result.push(data);
            read(null, (end: any, data: any) => {
              if (end === true) {
                expect(result).toEqual([]);
                done();
              }
            });
          }
        });
      }
    });
  });
});
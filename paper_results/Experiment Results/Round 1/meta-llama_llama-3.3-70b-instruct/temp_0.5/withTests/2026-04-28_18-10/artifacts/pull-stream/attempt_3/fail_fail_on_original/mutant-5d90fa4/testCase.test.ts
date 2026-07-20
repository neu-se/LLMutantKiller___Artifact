import { values } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values function', () => {
  it('should return an array when given an undefined value', (done) => {
    const read = values(undefined);
    let called = false;
    read(null, (end: any, data: any) => {
      if (end === true) {
        expect(called).toBe(true);
        done();
      } else {
        called = true;
        expect(data).toBeDefined();
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(called).toBe(true);
            done();
          }
        });
      }
    });
  });
});
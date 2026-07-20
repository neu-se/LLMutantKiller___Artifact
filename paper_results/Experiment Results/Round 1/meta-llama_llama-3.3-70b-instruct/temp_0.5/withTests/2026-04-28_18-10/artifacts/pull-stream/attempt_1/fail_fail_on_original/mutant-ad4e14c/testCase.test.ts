import { through } from '../../../throughs/through';

describe('through', () => {
  it('should call onEnd with the correct argument', (done) => {
    let called = false;
    const onEnd = (err: any) => {
      if (err === null) {
        called = true;
      } else {
        called = false;
      }
    };

    const stream = through(null, onEnd);

    stream(null, (end: any, data: any) => {
      if (end === true) {
        expect(called).toBe(true);
        done();
      }
    });
  });
});
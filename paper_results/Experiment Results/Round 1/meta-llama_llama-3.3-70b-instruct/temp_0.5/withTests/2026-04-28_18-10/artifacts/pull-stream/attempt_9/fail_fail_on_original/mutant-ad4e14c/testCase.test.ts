import through from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should call onEnd with the correct argument', (done) => {
    let calledWithNull = false;
    const onEnd = (err: any) => {
      if (err === null) {
        calledWithNull = true;
      } else if (err === true) {
        calledWithNull = false;
      }
      done();
    };

    const stream = through(null, onEnd);

    stream(null)((end: any, data: any) => {
      stream(true, (end: any, data: any) => {
        expect(calledWithNull).toBe(true);
        done();
      });
    });
  });
});
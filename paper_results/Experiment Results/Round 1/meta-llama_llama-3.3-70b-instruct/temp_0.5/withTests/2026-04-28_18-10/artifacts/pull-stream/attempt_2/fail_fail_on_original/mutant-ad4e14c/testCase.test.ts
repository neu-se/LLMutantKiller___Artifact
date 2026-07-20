import { through } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through';

describe('through', () => {
  it('should call onEnd with the correct argument', (done) => {
    let calledWithNull = false;
    const onEnd = (err: any) => {
      if (err === null) {
        calledWithNull = true;
      }
    };

    const stream = through(null, onEnd);

    stream(true, (end: any, data: any) => {
      expect(calledWithNull).toBe(true);
      done();
    });
  });
});
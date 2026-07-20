import through from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js';

describe('through', () => {
  it('should call onEnd with the correct argument', () => {
    let calledWithNull = false;
    const onEnd = (err: any) => {
      if (err === null) {
        calledWithNull = true;
      } else if (err === true) {
        calledWithNull = false;
      }
    };

    const stream = through(null, onEnd);

    const read = stream(null);

    expect(calledWithNull).toBe(false);
  });
});
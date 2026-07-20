describe('through', () => {
  it('should call onEnd with the correct abort value', () => {
    const through = require('../../throughs/through.js');
    let called = false;
    let abortValue: any;
    const onEnd = (abort: any) => {
      called = true;
      abortValue = abort;
    };

    const stream = through(null, onEnd);
    const read = stream(null);

    read(true, () => {});

    expect(called).toBe(true);
    expect(abortValue).toBeNull();
  });
});
describe('through', () => {
  it('should call onEnd with the correct abort value', () => {
    let called = false;
    let abortValue: any;

    const throughModule = require('../../../../throughs/through');
    const through = throughModule;

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
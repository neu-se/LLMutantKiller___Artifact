describe('find function', () => {
  it('should call the callback when the test function returns true', () => {
    const testFunction = (data: any) => data === 5;
    const callback = jest.fn();
    const read = () => {
      return (end: any, cb: any) => {
        if (end) {
          cb(end);
        } else {
          cb(null, 5);
        }
      };
    };
    const findMock = jest.fn((test: any, cb: any) => {
      if (cb) {
        cb(null, 5);
      }
    });
    findMock(testFunction, callback)(read());
    expect(findMock).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, 5);
  });
});
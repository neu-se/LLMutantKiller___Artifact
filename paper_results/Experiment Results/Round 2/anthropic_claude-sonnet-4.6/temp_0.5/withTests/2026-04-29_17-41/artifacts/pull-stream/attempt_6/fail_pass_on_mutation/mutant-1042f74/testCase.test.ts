import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('warns and throws when no done callback provided and stream errors', () => {
    const testError = new Error('test');
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    const source = (abort: any, cb: Function) => {
      cb(testError);
    };

    expect(() => {
      drain(null)(source);
    }).toThrow(testError);
    
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle nextTick with process.nextTick', () => {
    const spy = jest.fn();
    jest.spyOn(process, 'nextTick');
    Q.nextTick(spy);
    expect(process.nextTick).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(0);
    process.nextTick.mock.calls[0][0]();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(process.nextTick).toHaveBeenCalledWith(expect.any(Function));
  });
});
import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should call the function with the correct arguments when the first argument is a function', () => {
    const func = jest.fn((a: any) => a);
    pull(func, (read: any) => read);
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(expect.any(Function));
  });
})
import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should not call exec function when key is an object without exec function in the original code', () => {
    const data = 'hello world';
    const key = { foo: 'bar' };
    const execSpy = jest.fn();
    key.exec = execSpy;
    prop(key)(data);
    expect(execSpy).not.toHaveBeenCalled();
  });
});
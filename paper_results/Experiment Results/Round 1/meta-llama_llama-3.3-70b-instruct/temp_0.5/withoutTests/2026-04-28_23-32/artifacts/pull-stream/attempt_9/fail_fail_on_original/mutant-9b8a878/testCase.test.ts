import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should create a partial application with the correct number of arguments', () => {
    const partial = pull(function (a: any) { return a });
    expect(partial.length).toBe(1);
    const partialWithArgs = partial(function (a: any) { return a }, function (a: any) { return a }, function (a: any) { return a });
    expect(partialWithArgs.length).toBe(1);
    expect(() => partialWithArgs(function (a: any) { return a }, function (a: any) { return a }, function (a: any) { return a })).toThrowError();
  })
})
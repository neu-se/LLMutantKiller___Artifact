import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should create a partial application with the correct number of arguments', () => {
    const partial = pull(function (a: any) { return a });
    const partialWithArgs = partial;
    expect(partialWithArgs.length).toBe(1);
    const partialWithMultipleArgs = pull(function (a: any) { return a });
    const result = partialWithMultipleArgs(function (a: any) { return a }, function (a: any) { return a });
    expect(result.length).toBe(1);
  })
})
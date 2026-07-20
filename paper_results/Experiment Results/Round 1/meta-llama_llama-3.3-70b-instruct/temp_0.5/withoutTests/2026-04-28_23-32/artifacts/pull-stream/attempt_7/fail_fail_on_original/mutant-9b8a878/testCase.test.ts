import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should create a partial application with the correct number of arguments', () => {
    const partial = pull(function (a: any) { return a });
    expect(partial.length).toBe(1);
    const partialWithArgs = pull(function (a: any, b: any, c: any) { return a + b + c });
    expect(partialWithArgs.length).toBe(1);
  })
})
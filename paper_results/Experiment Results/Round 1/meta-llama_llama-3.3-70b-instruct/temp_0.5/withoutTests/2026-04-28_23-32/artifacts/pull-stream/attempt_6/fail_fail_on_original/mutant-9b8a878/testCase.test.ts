import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should throw an error when args array is empty in partial application', () => {
    const partial = pull(function (a: any) { return a });
    expect(() => partial()).toThrowError('TypeError: partial sink should only be called once!');
    const partialWithArgs = pull(function (a: any) { return a });
    expect(() => partialWithArgs(function (a: any) { return a }, function (a: any) { return a })).toThrowError();
  })
})
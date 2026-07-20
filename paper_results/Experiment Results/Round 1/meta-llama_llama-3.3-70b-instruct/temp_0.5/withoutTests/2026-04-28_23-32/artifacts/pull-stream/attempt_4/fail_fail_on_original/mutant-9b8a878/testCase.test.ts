import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should create an array of the correct length when used as a partial application', () => {
    const partial = pull(function (a: any) { return a });
    const partialWithArgs = partial(function (a: any) { return a }, function (a: any) { return a }, function (a: any) { return a });
    expect(() => partialWithArgs()).toThrowError('TypeError: partial sink should only be called once!');
  })
})
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should throw an error when used as a partial application with multiple arguments', () => {
    const partial = pull(function (a) { return a });
    expect(() => partial(function (a) { return a }, function (a) { return a }, function (a) { return a })).toThrowError('TypeError: partial sink should only be called once!');
  })
})
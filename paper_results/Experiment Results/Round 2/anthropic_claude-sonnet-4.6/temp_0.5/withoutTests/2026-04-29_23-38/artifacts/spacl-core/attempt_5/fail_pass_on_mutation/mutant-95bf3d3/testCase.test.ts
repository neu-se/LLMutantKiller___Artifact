import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('root path "/" should match spec "/**" via Symbol.match', () => {
    const matcher = new Matcher('/**')
    const result = matcher[Symbol.match]('/')
    expect(result).not.toBeNull()
  })
})
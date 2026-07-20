import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('root path "/" should match spec "/**"', () => {
    const matcher = new Matcher('/**')
    expect('/'.match(matcher)).not.toBeNull()
  })
})
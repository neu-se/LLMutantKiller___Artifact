import { Matcher } from "../src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should match root path "/" with spec "/++"', () => {
    const matcher = new Matcher('/++')
    // /++ should match "/" (root path) because ++ means match-one-or-none
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})
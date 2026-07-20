import { Matcher } from "../src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash behavior', () => {
  it('should return null when matching a path with a trailing slash', () => {
    const matcher = Matcher.for('/foo')
    const result = '/foo/'.match(matcher)
    expect(result).toBeNull()
  })
})
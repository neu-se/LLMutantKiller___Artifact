import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher malformed captures error message', () => {
  it('throws an error with the message "Path contains malformed captures" for malformed capture paths', () => {
    expect(() => {
      new Matcher('/foo:')
    }).toThrow('Path contains malformed captures')
  })
})
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should NOT match empty string with /** matcher', () => {
    const matcher = Matcher.for('/**')
    // Original: opt=true → regex is ^/$|^(?:/[^/]+)*$  — does NOT match ""
    // Mutated: opt=false → regex is ^(?:/[^/]+)*$      — DOES match "" (zero repetitions)
    expect(''.match(matcher)).toBeNull()
  })
})
| Package                 | # Killed | Mutants | Total Tests | Successful Tests † | Stmt Cov | Branch Cov | Base Commit Hash |
|-------------------------|----------|---------|-------------|--------------------|----------|------------|------------------|
| Complex.js              | 65       | 225     | 313         | 236                | 85.53    | 65.57      | d995ca1          |
| countries-and-timezones | 0        | 6       | 41          | 32                 | 99       | 79.78      | 241dd0f          |
| crawler-url-parser      | 0        | 70      | 27          | 9                  | 90.99    | 81.25      | 202c5b2          |
| delta                   | 0        | 72      | 781         | 292                | 91.18    | 85.17      | 5ffb853          |
| image-downloader        | 0        | 11      | 30          | 8                  | 0        | 0          | 19a53f6          |
| node-dirty              | 1        | 49      | 322         | 117                | 66.03    | 59.61      | d7fb4d4          |
| node-geo-point          | 0        | 53      | 126         | 69                 | 97.56    | 91.17      | c839d47          |
| node-jsonfile           | 0        | 5       | 16          | 16                 | 76.59    | 64.7       | 9c6478a          |
| plural                  | 0        | 34      | 32          | 12               ‡ | 73.84    | 63.63      | f0027d6          |
| pull-stream             | 7        | 90      | 577         | 222                | 87.17    | 75.23      | 29b4868          |
| q                       | 4        | 272     | 626         | 422              ‡ | 75.67    | 54.73      | 6bc7f52          |
| spacl-core              | 0        | 20      | 449         | 126                | 93.7     | 79.54      | fcb8511          |
| zip-a-folder            | 0        | 8       | 96          | 40                 | 100      | 96.66      | d2ea465          |

† claude-sonnet-4; maxTokens=2000; only includes tests that pass on the base commit.

‡ excludes 1 flaky test marked as PASSED on generation but FAILED on a second run

Notes:
- flaky tests complicate automatic interpretation of mutant kill rates from mocha report files
- statement + branch coverage reported here does not deduct the contribution of flaky tests that originally passed on the base commit

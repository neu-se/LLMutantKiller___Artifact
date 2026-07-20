| Package                 | # Killed | Mutants | Total Tests | Successful Tests † | Stmt Cov | Branch Cov | Base Commit Hash |
|-------------------------|----------|---------|-------------|--------------------|----------|------------|------------------|
| Complex.js              | 65       | 225     | 302         | 234                | 84.01    | 64.59      | d995ca1          |
| countries-and-timezones | 0        | 6       | 43          | 31                 | 99       | 79.78      | 241dd0f          |
| crawler-url-parser      | 0        | 70      | 49          | 7                  | 90.99    | 78.75      | 202c5b2          |
| delta                   | 0        | 72      | 205         | 118                | 87.15    | 80.75      | 5ffb853          |
| image-downloader        | 0        | 11      | 15          | 5                  | 66.66    | 43.75      | 19a53f6          |
| node-dirty              | 1        | 49      | 283         | 111                | 62.26    | 57.69      | d7fb4d4          |
| node-geo-point          | 0        | 53      | 111         | 70                 | 96.34    | 88.23      | c839d47          |
| node-jsonfile           | 0        | 5       | 16          | 16                 | 76.59    | 64.7       | 9c6478a          |
| plural                  | 0        | 34      | 32          | 11               ‡ | 75.38    | 59.09      | f0027d6          |
| pull-stream             | 1        | 90      | 82          | 63                 | 76.67    | 58.41      | 29b4868          |
| q                       | 4        | 272     | 622         | 424              * | 74.86    | 54.73      | 6bc7f52          |
| spacl-core              | 0        | 20      | 179         | 50                 | 86.71    | 68.18      | fcb8511          |
| zip-a-folder            | 0        | 8       | 20          | 15                 | 83.78    | 56.66      | d2ea465          |

† claude-sonnet-4; maxTokens=2000; only includes tests that pass on the base commit.

‡ excludes 1 flaky test marked as PASSED on generation but FAILED on a second run

\* excludes 2 flaky tests marked as PASSED on generation but FAILED on a second run

Notes:
- flaky tests complicate automatic interpretation of mutant kill rates from mocha report files

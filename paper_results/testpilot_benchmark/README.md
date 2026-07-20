# Where to find generated test cases and logs

These stored results were produced with
[TestPilot v2](https://github.com/neu-se/testpilot2.git) using its default
configuration. The TestPilot execution infrastructure is not bundled in this
artifact; RQ6 is supported here by the stored generated tests, execution logs,
and consolidated results from five trials.

## Where to find generated test cases

The test cases TestPilot generated for benchmark repository `Foo` in trial `n` are found in `benchmark_trialn/testpilot/Foo/tests/`.

For example, the test cases TestPilot generated for benchmark repository delta in trial 3 are in [`benchmark_trial3/testpilot/delta/tests/`](benchmark_trial3/testpilot/delta/tests/).

## Where to find execution Logs

The execution log for trial `n`'s run of TestPilot on benchmark repository `Foo` are found in `benchmark_trialn/testpilot/Foo/testpilot_log.txt`.

For example, to find trial 3's execution logs for its run of TestPilot on benchmark repository delta, navigate to [`benchmark_trial3/testpilot/delta/testpilot_log.txt`](benchmark_trial3/testpilot/delta/testpilot_log.txt).

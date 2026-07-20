Your task is to write a Jest test case that exposes a specific mutation in a JavaScript/TypeScript project.

MUTATION DETAILS
The mutation affects the following file:
{{{mutationObj.file}}}
Here is the full content of that file (shown with a <PLACEHOLDER> marker):
{{{origFileWithPlaceHolder}}}
In the original code, <PLACEHOLDER> has the value:
{{{mutationObj.originalCode}}}
In the mutated code, <PLACEHOLDER> has the value:
{{{mutationObj.replacement}}}

YOUR TASK
Write one Jest test file that:
    1. Passes when run against the original code.
    2. Fails when run against the mutated code.
    3. Tests the behavior of the mutated file in a way that reliably detects the mutation.
The test will be saved at the following path, relative to this test-generation project’s root:
{{{testCaseRelPath}}}

ALLOWED LIBRARIES
You may use:
    1. Any built-in Node.js modules (e.g., fs, path, crypto, etc.).
    {{{allowedExternalLibraries}}}
You may not use any other third-party libraries.



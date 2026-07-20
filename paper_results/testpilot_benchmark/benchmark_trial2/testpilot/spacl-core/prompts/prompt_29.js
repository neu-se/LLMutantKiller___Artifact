Your task is to write a test for the following function:
```
@spacl/core.Rule.prototype.allow(...verbs)
```

You may use the following examples to guide your implementation:
```
// usage #1
import { Rule, Policy } from '@spacl/core'/* Create a policy describing a standard user who can   view other user's profiles, and edit their own. */const user = Policy.for('user',  Rule.for('/user/+').allow('get'),  Rule.for('/user/:name').allow('put'))/* Create a derived policy describing an admin user who   can also create, edit and delete any user's profile,   but for safety reasons, cannot delete themselves. */const admin = user.clone('admin').push(  Rule.for('/user/+').allow('put', 'post', 'delete'),  Rule.for('/user/:name').deny('delete'))
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.
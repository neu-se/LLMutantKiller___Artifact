Your task is to write a test for the following function:
```
@spacl/core.Policy.prototype.query(path, verb, ctx)
```

You may use the following examples to guide your implementation:
```
// usage #1
/* Query context for our hypothetical user, 'foo'. */const ctx = { name: 'foo' }/* What can 'foo' access if they are granted 'user' rights? */user.query('/user/foo', 'get',    ctx) /* true; explicitly allowed */user.query('/user/foo', 'put',    ctx) /* true; explicitly allowed */user.query('/user/foo', 'delete', ctx) /* null; implicitly denied */user.query('/user/bar', 'get',    ctx) /* true; explicitly allowed */user.query('/user/bar', 'put',    ctx) /* null; implicitly denied */user.query('/user/bar', 'delete', ctx) /* null; implicitly denied *//* Alternatively, what if 'foo' is granted 'admin' rights? */admin.query('/user/foo', 'get',    ctx) /* true; explicitly allowed */admin.query('/user/foo', 'put',    ctx) /* true; explicitly allowed */admin.query('/user/foo', 'delete', ctx) /* false; explicitly denied */admin.query('/user/bar', 'get',    ctx) /* true; explicitly allowed */admin.query('/user/bar', 'put',    ctx) /* true; explicitly allowed */admin.query('/user/bar', 'delete', ctx) /* true; explicitly allowed */
// usage #2
/* Query context for our hypothetical user, 'foo'. */const ctx = { name: 'foo' }/* What can 'foo' access if they are granted 'user' rights? */user.query('/user/foo', 'get',    ctx) /* true; explicitly allowed */user.query('/user/foo', 'put',    ctx) /* true; explicitly allowed */user.query('/user/foo', 'delete', ctx) /* null; implicitly denied */user.query('/user/bar', 'get',    ctx) /* true; explicitly allowed */user.query('/user/bar', 'put',    ctx) /* null; implicitly denied */user.query('/user/bar', 'delete', ctx) /* null; implicitly denied *//* Alternatively, what if 'foo' is granted 'admin' rights? */admin.query('/user/foo', 'get',    ctx) /* true; explicitly allowed */admin.query('/user/foo', 'put',    ctx) /* true; explicitly allowed */admin.query('/user/foo', 'delete', ctx) /* false; explicitly denied */admin.query('/user/bar', 'get',    ctx) /* true; explicitly allowed */admin.query('/user/bar', 'put',    ctx) /* true; explicitly allowed */admin.query('/user/bar', 'delete', ctx) /* true; explicitly allowed */
// usage #3
/* Query context for our hypothetical user, 'foo'. */const ctx = { name: 'foo' }/* What can 'foo' access if they are granted 'user' rights? */user.query('/user/foo', 'get',    ctx) /* true; explicitly allowed */user.query('/user/foo', 'put',    ctx) /* true; explicitly allowed */user.query('/user/foo', 'delete', ctx) /* null; implicitly denied */user.query('/user/bar', 'get',    ctx) /* true; explicitly allowed */user.query('/user/bar', 'put',    ctx) /* null; implicitly denied */user.query('/user/bar', 'delete', ctx) /* null; implicitly denied *//* Alternatively, what if 'foo' is granted 'admin' rights? */admin.query('/user/foo', 'get',    ctx) /* true; explicitly allowed */admin.query('/user/foo', 'put',    ctx) /* true; explicitly allowed */admin.query('/user/foo', 'delete', ctx) /* false; explicitly denied */admin.query('/user/bar', 'get',    ctx) /* true; explicitly allowed */admin.query('/user/bar', 'put',    ctx) /* true; explicitly allowed */admin.query('/user/bar', 'delete', ctx) /* true; explicitly allowed */
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.
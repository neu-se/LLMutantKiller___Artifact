Your task is to write a test for the following function:
```
dirty.Dirty.prototype.set(key, val, cb)
```

You may use the following examples to guide your implementation:
```
// usage #1
  var Dirty = require('dirty');  var db = new Dirty('user.db');  db.on('load', function() {    db.set('john', {eyes: 'blue'});    console.log('Added john, he has %s eyes.', db.get('john').eyes);    db.set('bob', {eyes: 'brown'}, function() {      console.log('User bob is now saved on disk.')    });    db.forEach(function(key, val) {      console.log('Found key: %s, val: %j', key, val);    });  });  db.on('drain', function() {    console.log('All records are saved on disk now.');  });
// usage #2
'use strict';// eslint-disable-next-line node/no-missing-requireconst Dirty = require('dirty');const path = require('path');const db = new Dirty(path.join(__dirname, 'bob.dirty'));db.on('load', () => {  db.set('john', {eyes: 'blue'});  console.log('Added john, he has %s eyes.', db.get('john').eyes);  db.set('bob', {eyes: 'brown'}, () => {    console.log('User bob is now saved on disk.');  });  db.forEach((key, val) => {    console.log('Found key: %s, val: %j', key, val);  });});
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
describe('test dirty', function() {
    it('test dirty.Dirty.prototype.set', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.
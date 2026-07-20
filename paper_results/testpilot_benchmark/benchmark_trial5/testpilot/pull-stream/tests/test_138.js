let assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

// Simple test runner to replace mocha
function describe(name, fn) {
    console.log(`\n${name}`);
    fn();
}

function it(name, fn) {
    console.log(`  ${name}`);
    fn(() => {
        console.log('    ✓ passed');
    });
}

describe('test pull_stream', function() {
    })
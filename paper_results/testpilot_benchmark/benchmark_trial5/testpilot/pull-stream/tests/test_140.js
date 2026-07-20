const assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

// Simple test runner
function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function it(name, fn) {
  try {
    fn(() => {
      console.log(`  ✓ ${name}`);
    });
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
  }
}

describe('test pull_stream', function() {
    })
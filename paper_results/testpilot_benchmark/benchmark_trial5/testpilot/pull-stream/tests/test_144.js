const assert = require('assert');

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
  try {
    if (fn.length > 0) {
      // Test function expects a done callback
      fn(() => {
        console.log('    ✓ passed');
      });
    } else {
      fn();
      console.log('    ✓ passed');
    }
  } catch (error) {
    console.log(`    ✗ failed: ${error.message}`);
    throw error;
  }
}

describe('test pull_stream', function() {
    })
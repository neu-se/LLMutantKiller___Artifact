let mocha = require('mocha');
let assert = require('assert');

// Mock pull-stream function (since we're testing the provided implementation)
function pull(a) {
  var length = arguments.length
  if (typeof a === 'function' && a.length === 1) {
    var args = new Array(length)
    for(var i = 0; i < length; i++)
      args[i] = arguments[i]
    return function (read) {
      if (args == null) {
        throw new TypeError("partial sink should only be called once!")
      }

      var ref = args
      args = null

      switch (length) {
      case 1: return pull(read, ref[0])
      case 2: return pull(read, ref[0], ref[1])
      case 3: return pull(read, ref[0], ref[1], ref[2])
      case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])
      default:
        ref.unshift(read)
        return pull.apply(null, ref)
      }
    }
  }

  var read = a

  if (read && typeof read.source === 'function') {
    read = read.source
  }

  for (var i = 1; i < length; i++) {
    var s = arguments[i]
    if (typeof s === 'function') {
      read = s(read)
    } else if (s && typeof s === 'object') {
      s.sink(read)
      read = s.source
    }
  }

  return read
}

describe('test pull_stream', function() {
    it('should return a partial application when first argument is a function with length 1', function(done) {
        // Create a mock sink function
        function mockSink(read) {
            return 'sink_result';
        }
        
        // Create partial application
        const partial = pull(mockSink);
        
        // Verify it returns a function
        assert.strictEqual(typeof partial, 'function');
        
        // Test the partial application
        const mockRead = function() { return 'read_data'; };
        const result = partial(mockRead);
        
        assert.strictEqual(result, 'sink_result');
        done();
    });

    })
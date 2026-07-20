let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique transform that filters items with duplicate nested field values
function nonUnique(fieldPath) {
    return pull_stream.through(function(read) {
        let seen = new Map();
        let buffer = [];
        
        return function(end, cb) {
            if (end) return read(end, cb);
            
            read(null, function(end, data) {
                if (end === true) {
                    // End of stream, return buffered duplicates
                    if (buffer.length > 0) {
                        let item = buffer.shift();
                        cb(null, item);
                    } else {
                        cb(true);
                    }
                } else if (end) {
                    cb(end);
                } else {
                    // Get nested field value
                    let value = data;
                    let parts = fieldPath.split('.');
                    for (let part of parts) {
                        value = value && value[part];
                    }
                    
                    if (seen.has(value)) {
                        seen.get(value).push(data);
                    } else {
                        seen.set(value, [data]);
                    }
                    
                    // Continue reading
                    read(null, arguments.callee);
                }
            });
        };
    });
}

// Add nonUnique to pull_stream
pull_stream.nonUnique = nonUnique;

it('.');
                    for (let part of parts) {
                        value = value && value[part];
                    }
                    
                    if (seen.has(value)) {
                        seen.get(value).push(data);
                    } else {
                        seen.set(value, [data]);
                    }
                    
                    // Continue reading
                    read(null, arguments.callee);
                }
            });
        };
    });
}

// Add nonUnique to pull_stream
pull_stream.nonUnique = nonUnique;

it('.');
                    for (let part of parts) {
                        value = value && value[part];
                    }
                    
                    if (seen.has(value)) {
                        seen.get(value).push(data);
                    } else {
                        seen.set(value, [data]);
                    }
                    
                    // Continue reading
                    read(null, arguments.callee);
                }
            });
        };
    });
}

// Add nonUnique to pull_stream
pull_stream.nonUnique = nonUnique;

describe('test pull_stream', function() {
    
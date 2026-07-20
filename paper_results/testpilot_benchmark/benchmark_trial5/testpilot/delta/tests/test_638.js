let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.eachLine with custom newline character', function(done) {
        let delta = new quill_delta([
            { insert: 'Line1|Line2|Line3' }
        ]);
        
        let lines = [];
        
        delta.eachLine((line, attrs, i) => {
            lines.push(line.ops[0].insert);
        }, '|');
        
        if (lines.length !== 3) {
            return done(new Error(`Expected 3 lines, got ${lines.length}`));
        }
        if (lines[0] !== 'Line1') {
            return done(new Error(`Expected 'Line1', got '${lines[0]}'`));
        }
        if (lines[1] !== 'Line2') {
            return done(new Error(`Expected 'Line2', got '${lines[1]}'`));
        }
        if (lines[2] !== 'Line3') {
            return done(new Error(`Expected 'Line3', got '${lines[2]}'`));
        }
        
        done();
    });
});
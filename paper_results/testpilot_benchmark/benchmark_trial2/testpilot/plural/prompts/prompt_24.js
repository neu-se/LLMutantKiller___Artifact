The test:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
        // Store original String prototype methods to restore later
        const originalPluralize = String.prototype.pluralize;
        const originalSingularize = String.prototype.singularize;
        
        try {
            // Apply monkey patch
            plural.monkeyPatch();
            
            // Test that pluralize method was added to String prototype
            assert(typeof String.prototype.pluralize === 'function', 'pluralize method should be added to String prototype');
            
            // Test that singularize method was added to String prototype
            assert(typeof String.prototype.singularize === 'function', 'singularize method should be added to String prototype');
            
            // Test pluralize functionality
            assert.strictEqual('cat'.pluralize(), 'cats', 'should pluralize cat to cats');
            assert.strictEqual('dog'.pluralize(), 'dogs', 'should pluralize dog to dogs');
            assert.strictEqual('child'.pluralize(), 'children', 'should pluralize child to children');
            
            // Test singularize functionality
            assert.strictEqual('cats'.singularize(), 'cat', 'should singularize cats to cat');
            assert.strictEqual('dogs'.singularize(), 'dog', 'should singularize dogs to dog');
            assert.strictEqual('children'.singularize(), 'child', 'should singularize children to child');
            
            done();
        } catch (error) {
            done(error);
        } finally {
            // Restore original prototype methods
            if (originalPluralize) {
                String.prototype.pluralize = originalPluralize;
            } else {
                delete String.prototype.pluralize;
            }
            
            if (originalSingularize) {
                String.prototype.singularize = originalSingularize;
            } else {
                delete String.prototype.singularize;
            }
        }
    });
    
    })
``` 
failed with the following error message:
```
pluralize method should be added to String prototype  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.
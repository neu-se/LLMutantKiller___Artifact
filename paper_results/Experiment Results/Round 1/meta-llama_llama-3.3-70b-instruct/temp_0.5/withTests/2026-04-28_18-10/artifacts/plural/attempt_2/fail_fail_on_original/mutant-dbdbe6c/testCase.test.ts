import plural = require('../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should throw an error when monkey patching is attempted without a check for String.prototype.plural', () => {
    String.prototype.plural = () => 'custom plural function';
    plural.monkeyPatch = function() {
      String.prototype.plural = function(num) {
        return plural(this, num)
      }
    };
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
});
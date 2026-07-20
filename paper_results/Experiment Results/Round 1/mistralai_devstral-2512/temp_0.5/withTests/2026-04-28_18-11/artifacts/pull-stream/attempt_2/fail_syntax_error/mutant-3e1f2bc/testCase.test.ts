```typescript
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream mutation test", () => {
  it("should correctly handle object streams with sink/source methods", (done) => {
    const testObject = {
      source: function (read) {
        return function (abort, cb) {
          if (abort) return cb(abort);
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, data);
          });
        };
      },
      sink: function (read) {
        read(null, function (end, data) {
          if (end) return;
        });
      }
    };

    const sourceData = [1, 2, 3];
    let index = 0;

    const source = function (abort, cb) {
      if (abort) return cb(abort);
      if (index >= sourceData.length) return cb(true);
      cb(null, sourceData[index++]);
    };
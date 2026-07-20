const Q = require(process.env.Q_TARGET);

const def = Q.defer();
const p2 = def.promise.progress(function () {
  throw new Error("boo!");
});

Q.onerror = function () {};

const progressValues = [];
p2.then(void 0, void 0, function (progressValue) {
  progressValues.push(progressValue);
});

def.notify("progress");

setTimeout(function () {
  console.log(JSON.stringify(progressValues));
  process.exit(0);
}, 20);

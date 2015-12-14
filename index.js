// Insert some markup into the html just before the closing of the element 
// matched by the selector.

var trumpet = require('trumpet');
var duplexer = require('duplexer');
var through = require('through');

module.exports = function (selector, html) {
  var tr1 = trumpet();
  var tr2 = trumpet();
  var element = tr2.createStream(selector);

  element.pipe(through(
      null,
      function () {
        this.queue(html)
        this.queue(null)
      }))
    .pipe(element)

  tr1.pipe(tr2)

  return duplexer(tr1, tr2)
}

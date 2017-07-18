module.exports = function (scriptCompiler) {

  var compiler = require('vue-template-compiler');
  var parseVueComponent = compiler.parseComponent.bind(compiler);

  // patching the original function because otherwise
  // vue-loader creates a second line padding
  compiler.parseComponent = function (content, opts) {
    return parseVueComponent(content);
  };

  return function (file) {
    var output = parseVueComponent(file.content, {pad: 'line'});
    if (!output.script) return {code: file.content, noScript: true};

    var compilationResult = scriptCompiler({
      path: file.path,
      content: output.script.content
    });

    compilationResult.scriptRange = {
      start: output.script.start,
      end: output.script.start + compilationResult.code.length
    };

    compilationResult.code = file.content.substring(0, compilationResult.scriptRange.start)
      + compilationResult.code
      + file.content.substring(output.script.end);

    return compilationResult;
  };
}
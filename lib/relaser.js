var ProgressBar = require('progress');
var exec = require('child_process').exec;
var bar;

/**
 * @param  {String} version patch, minor, major
 * @param  {Object} options 
 * @return {void}         
 */
module.exports = function (version, options) {
  var managers = options.managers || [];
  var bumpBower = managers.indexOf('bower') > -1;
  var bumpNpm = managers.indexOf('npm') > -1;
  var bothManagers = bumpBower && bumpNpm;
  var cmds = [];
  var push = options.push_code === false ? false : true;
  var build = options.build_command;
  var publish = options.publish === false ? false : true;

  if (bumpBower) {
    cmds.push('bower version ' + version + ' -f');
  }

  if (bumpNpm) {
    var npmGitTag = bothManagers ? ' --no-git-tag-version' : '';

    cmds.push('npm version ' + version + ' --force' + npmGitTag);
  }

  if (build) {
    cmds.push(build);
  }

  if (push) {
    cmds = cmds.concat([
      'git add .',
      'git commit --amend --reuse-message=HEAD',
      'git push --tags',
      'git push'
    ]);
  }

  if (publish) {
    cmds.push('npm publish'); 
  }

  bar = new ProgressBar('Releasing [:bar] :percent', {
    total: cmds.length,
    width: 30
  });

  runCommand(cmds);
}

function runCommand(cmds) {
  if (!cmds.length) return;

  var cmd = cmds.shift();
  
  exec(cmd, function(error, stdout, stderr) {
    bar.tick();

    if (bar.complete && !cmds.length) {
      //TODO: Show info of the release
      return console.log('Relase done');
    }

    runCommand(cmds);
  });
}
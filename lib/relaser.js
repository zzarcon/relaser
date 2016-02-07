var exec = require('child_process').exec;

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
  var relaseCommand = [];
  var push = options.push_code === false ? false : true;
  var build = options.build_command;
  var publish = options.publish === false ? false : true;

  if (bumpBower) {
    relaseCommand.push('bower version ' + version + ' -f');
  }

  if (bumpNpm) {
    var npmGitTag = bothManagers ? ' --no-git-tag-version' : '';

    relaseCommand.push('npm version ' + version + ' --force' + npmGitTag);
  }

  if (build) {
    relaseCommand.push(build);
  }

  if (push) {
    var amend = 'git add . && git commit --amend --reuse-message=HEAD'; 
    var push = 'git push --tags && git push';

    relaseCommand.push([amend, push].join(' && '));
  }

  if (publish) {
    relaseCommand.push('npm publish'); 
  }

  var cmd = relaseCommand.join(' && ');

  console.log(cmd);

  exec(cmd);
}
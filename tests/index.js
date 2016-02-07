var expect = require('chai').expect;
var assert = require('assert');
var relaser = require('../lib/relaser');

describe('Relaser', function() {
  var options = {
    managers: ['npm', 'bower']  
  };

  describe('#Managers', function() {
    it('Bumps Bower version', function () {
      var cmds = relaser('patch', {managers: ['bower']});

      expect(cmds).to.contain('bower version patch -f');
    });
    it('Bumps Npm version', function () {
      var cmds = relaser('patch', {managers: ['npm']});

      expect(cmds).to.contain('npm version patch --force');
    });
    it('Bumps both', function () {
      var cmds = relaser('patch', options);

      expect(cmds).to.contain('bower version patch -f');
      expect(cmds).to.contain('npm version patch --force --no-git-tag-version');
    });
  });

  describe('#Push', function() {
    it('Contain the push commands when push_code is present', function() {
      var cmds = relaser('patch', options);

      checkPushCommands(cmds);
    });
    it('To not have the git commands', function() {
      var cmds = relaser('patch', {push_code: false});

      expect(cmds).to.not.contain('git add .');
      expect(cmds).to.not.contain('git push');
    });
  });

  describe('#Publish', function() {
    it('To have the publish command', function() {
      var cmds = relaser('patch', options);

      expect(cmds).to.contain('npm publish');
    });

    it('To not have the publish command', function() {
      var cmds = relaser('patch', {publish: false});

      expect(cmds).to.not.contain('npm publish');
    });
  });

  describe('#Version', function() {
    it('Bump major version', function() {
      var cmds = relaser('major', options);

      expect(cmds).to.contain('bower version major -f');
      expect(cmds).to.contain('npm version major --force --no-git-tag-version');
    });
  });

  describe('#Defaults', function() {
    it('Version type', function () {
      var cmds = relaser('patch', options);

      expect(cmds).to.contain('bower version patch -f');
    });
    it('Pushes the code', function () {
      var cmds = relaser('patch');

      checkPushCommands(cmds);
    });
    it('Publish the code', function () {
      var cmds = relaser('patch');

      expect(cmds).to.contain('npm publish');
    });
  });
});

function checkPushCommands(cmds) {
  expect(cmds).to.contain('git add .');
  expect(cmds).to.contain('git commit --amend --reuse-message=HEAD');
  expect(cmds).to.contain('git push --tags');
  expect(cmds).to.contain('git push');
}
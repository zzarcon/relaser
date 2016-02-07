# Relaser
> Javascript tool for release Node and Bower packages


### Installation

`$ npm i relaser -g` 

###Usage
Inside the root of your repository type

`$ relaser [version]` 

![](https://raw.github.com/zzarcon/relaser/master/relaser.gif)

Where `version` is one of **patch**, **minor**, **major** according to the Npm and Bower docs (default is **patch**)

* https://docs.npmjs.com/cli/version
* http://bower.io/docs/api/#version

### The configuration file AKA relaser.json
Relaser uses a configuration file in order to know what should relase.

**relaser.json**
```json
{
  "managers": ["bower", "npm"],
  "push_code": true,
  "publish": true,
  "build_command": null
}
```
* **managers**: specify on which platforms you want to publish.
* **push_code**: automatically pushes the tags and code to the repo (default true).
* **publish**: automatically publishes the version (default true).
* **build_command**: sometimes you need to do some extra job before publish the new version, like building assets, transpailing code, etc.
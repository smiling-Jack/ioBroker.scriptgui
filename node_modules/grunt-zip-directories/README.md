# grunt-zip-directories

> Zip all top level directories in a folder.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-zip-directories --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-zip-directories');
```

## The "zip_directories" task

### Overview
In your project's Gruntfile, add a section named `zip_directories` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  zip_directories: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

*No Options*

### Usage Examples

In this example, we find all top level folders in the irep directory, they will then be zipped including all files inside to irep/zips, the name of the zip will be the name of the original folder.

```js
grunt.initConfig({
  zip_directories: {
	irep: {
      files: [{
        filter: 'isDirectory',
        expand: true,
        cwd: './irep',
        src: ['*'],
        dest: './irep'
      }]
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

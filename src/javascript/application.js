require.config({
  baseUrl: 'javascript',
  paths: {
    underscore: 'vendor/underscore-1.5.2'
  }
, shim: {
    'underscore': {
      exports: '_'
    }
  }
});

require(['main']);

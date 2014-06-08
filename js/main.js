require.config({
    paths: {
        async: '../bower_components/requirejs-plugins/src/async',
        goog: '../bower_components/requirejs-plugins/src/goog',
        font: '../bower_components/requirejs-plugins/src/font',
        image: '../bower_components/requirejs-plugins/src/image',
        json: '../bower_components/requirejs-plugins/src/json',
        noext: '../bower_components/requirejs-plugins/src/noext',
        mdown: '../bower_components/requirejs-plugins/src/mdown',
        propertyParser : '../bower_components/requirejs-plugins/src/propertyParser',
        markdownConverter : '../bower_components/requirejs-plugins/lib/Markdown.Converter',
        underscore: '../bower_components/underscore/underscore',
    },
    shim: {
        underscore: {
          exports: '_'
        }
    }
});

require.config({
    paths: {
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min"
    }
  });

require(['project', 'navigator'],
    function(mymap) {
        console.log("INIT PROJECT");
    }
);
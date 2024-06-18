window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;
    var splash = document.getElementById('splash');
    splash.style.display = 'block';
    var progressBar = splash.querySelector('.progress-bar span');
    progressBar.style.width = '0%';
    function onProgress (completedCount, totalCount, item) {
        var percent = 100 * completedCount / totalCount;
        progressBar.style.width = percent.toFixed(2) + '%';
    };
    cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        splash.parentElement.removeChild(splash);
    });
    
    var RESOURCES = cc.AssetManager.BuiltinBundleName.RESOURCES;
    var INTERNAL = cc.AssetManager.BuiltinBundleName.INTERNAL;
    var MAIN = cc.AssetManager.BuiltinBundleName.MAIN;
    var onStart = function () {
  
        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / browsers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.assetManager.downloader.maxConcurrency = 2;
            cc.assetManager.downloader.maxRequestsPerFrame = 2;
        }
  
        var launchScene = settings.launchScene;
        var bundle = cc.assetManager.bundles.find(function (b) {
            return b.getSceneInfo(launchScene);
        });
        
        bundle.loadScene(launchScene, null, onProgress,
            function (err, scene) {
                if (!err) {
                    cc.director.runSceneImmediate(scene);
                    if (cc.sys.isBrowser) {
                        // show canvas
                        var canvas = document.getElementById('GameCanvas');
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                        console.log('Success to load scene: ' + launchScene);
                    }
                }
            }
        );
  
    };
  
    var option = {
        id: 'GameCanvas',
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };
  
    cc.assetManager.init({ 
        bundleVers: settings.bundleVers,
        remoteBundles: settings.remoteBundles,
        server: settings.server
    });
    
    var bundleRoot = [INTERNAL];
    settings.hasResourcesBundle && bundleRoot.push(RESOURCES);
  
    var count = 0;
    function cb (err) {
        if (err) return console.error(err.message, err.stack);
        count++;
        if (count === bundleRoot.length + 1) {
            cc.assetManager.loadBundle(MAIN, function (err) {
                if (!err) {
                  cc.macro.ENABLE_WEBGL_ANTIALIAS = true;
                  cc.game.run(option, onStart);
              }
            });
        }
    }
  
    cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x;}), cb);
  
    for (var i = 0; i < bundleRoot.length; i++) {
        cc.assetManager.loadBundle(bundleRoot[i], cb);
    }
  };
  
  if (window.jsb) {
    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.8a2cf.js');
        require('src/cocos2d-runtime.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.8a2cf.js');
        require('src/cocos2d-jsb.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/jsb-engine.js');
    }
  
    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
  }
window.addEventListener('load', function () {

    /********************************************/
    /********* MQTT Initialize Scripts **********/
    /********************************************/

    /* MQTT Initialize Scripts */
    deviceCommandQueue = "device_command";
    deviceStatusQueue = "device_status";
    mqttUserName = "liyezawv";
    mqttPassword = "eMz8JZazbzan";
    mqttServerHostName = "m12.cloudmqtt.com";
    mqttServerPort = 32855;
    mqttServerClientId = "serverWS" + new Date().getTime();
    captureDevice = "";
    photo = "";
    mqttConnectOptions = {
        onSuccess: onSuccess,
        useSSL: true,
        userName: mqttUserName,
        password: mqttPassword,
        keepAliveInterval: 999
    },
        deviceOperationCommand = {
            "commandType": "operation",
            "command": "off"
        };

    /* Callback for New Message */
    function onMessageArrived(message) {
        console.log("onMessageArrived:", message);
    }

    /* Callback for Connections Lost Handler*/
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:", responseObject.errorMessage);
            setTimeout(function () {
                clientMQTT.connect(mqttConnectOptions);
            }, 5000);
        }
    }

    /* Connection Success Callback */
    function onSuccess() {
        console.log("Connected To the MQTT Server!!");
        clientMQTT.subscribe(deviceStatusQueue);
    }

    clientMQTT = new Paho.MQTT.Client(mqttServerHostName, mqttServerPort, mqttServerClientId);

    /* MQTT event Callback handlers */
    clientMQTT.onConnectionLost = onConnectionLost;
    clientMQTT.onMessageArrived = onMessageArrived;

    /* Connect to the MQTT Server */
    clientMQTT.connect(mqttConnectOptions);

    /* Publish Message to Device */
    function sendCommandToDevice(message) {
        var requestPayload;

        message = JSON.stringify(message);
        requestPayload = new Paho.MQTT.Message(message);
        requestPayload.destinationName = deviceCommandQueue;
        clientMQTT.send(requestPayload);
    }

    /********************************************/
    /*********** AWE Init Script ****************/
    /********************************************/

    window.awe.init({
        /* Auto Detect Device Type */
        device_type: awe.AUTO_DETECT_DEVICE_TYPE,
        /* Default Application Settings */
        settings: {
            debug: true,
            container_id: 'container',
            fps: 60,
            default_camera_position: {x: 0, y: 0, z: 0},
            default_lights: [
                {
                    id: 'hemisphere_light',
                    type: 'hemisphere',
                    color: 0xCCCCCC
                }, {
                    id: 'point_light',
                    type: 'point',
                    color: 0xFFFFFF
                }
            ],
        },
        ready: function () {

            var d = '?_=' + Date.now();

            /* Require AWE Dependent Files from Client */
            awe.util.require([
                {
                    capabilities: ['webgl', 'gum'],
                    files: [
                        ['/javascripts/lib/awe/awe-standard-dependencies.js' + d, '/javascripts/lib/awe/awe-standard.js' + d], /* Core Application Dependencies */
                        ['/javascripts/lib/awe/plugins/StereoEffect.js' + d, '/javascripts/lib/awe/plugins/VREffect.js' + d], /* Application VR Dependencies */
                        '/javascripts/lib/awe/plugins/awe.rendering_effects.js' + d, /* Application Render Effect Dependencies */
                        '/javascripts/lib/awe/plugins/awe-standard-object_clicked_or_focused.js' + d, /* Application Click Handlers */
                        '/javascripts/lib/awe/dependencies/awe.gyro.js' + d, /* Application Gyro Dependencies */
                        '/javascripts/lib/awe/dependencies/awe.mouse.js' + d, /* Application Mouse Dependencies */
                    ],
                    success: function () {
                        /* Setup the initial Scene*/
                        awe.setup_scene();

                        var click_plugin = awe.plugins.view('object_clicked');
                        if (click_plugin) {
                            click_plugin.register();
                            click_plugin.enable();
                        }
                        var gyro_plugin = awe.plugins.view('gyro');
                        if (gyro_plugin) {
                            gyro_plugin.enable();
                        }
                        var mouse_plugin = awe.plugins.view('mouse');
                        if (mouse_plugin) {
                            mouse_plugin.enable();
                        }
                        awe.settings.update({data: {value: 'ar'}, where: {id: 'view_mode'}});
                        var render_effects_plugin = awe.plugins.view('render_effects');
                        if (render_effects_plugin) {
                            render_effects_plugin.enable();
                        }

                        /* AR Interactions Handlers */
                        window.addEventListener('object_clicked', function (e) {

                            console.log(e.detail.projection_id);

                            var p = awe.projections.view(e.detail.projection_id);

                            if (e.detail.projection_id && e.detail.projection_id.includes('lamp') > 0) {

                                if (deviceOperationCommand && deviceOperationCommand.command === "on") {
                                    deviceOperationCommand.command = "off";
                                } else {
                                    deviceOperationCommand.command = "on";
                                }

                                sendCommandToDevice(deviceOperationCommand);

                                awe.projections.update({ // rotate clicked object by 180 degrees around x and y axes over 10 seconds
                                    data: {
                                        animation: {
                                            duration: 2,
                                            persist: 0,
                                            repeat: 0
                                        },
                                        rotation: {
                                            x: 0,
                                            y: 360,
                                            z: 0
                                        }
                                    },
                                    where: {id: e.detail.projection_id}
                                });
                            }

                            /* Window Animation */
                            if (e.detail.projection_id && e.detail.projection_id.includes('window') > 0) {
                                awe.projections.update({ // rotate clicked object by 180 degrees around x and y axes over 10 seconds
                                    data: {
                                        animation: {
                                            duration: 10,
                                            persist: 1,
                                            repeat: 0
                                        },
                                        scale: {
                                            x: 70,
                                            y: 70,
                                            z: 70
                                        }
                                    },
                                    where: {id: e.detail.projection_id}
                                });
                            }
                        }, false);


                        function getCurrentPOVCoordinates() {

                            var localProjection,
                                worldProjection,
                                povMatrixWorld,
                                povOrientationDirection,
                                povProjectionRay,
                                povPosition,
                                povProjectionRayProjection,
                                resultFinalPoint;

                            localProjection = new THREE.Vector3(0, 0, -1);

                            povMatrixWorld = awe.pov().get_data().mesh.matrixWorld;

                            povPosition = awe.pov().get_data().mesh.position;

                            worldProjection = localProjection.applyMatrix4(povMatrixWorld);

                            povOrientationDirection = worldProjection.sub(povPosition).normalize();

                            povProjectionRay = new THREE.Ray(new THREE.Vector3(0, 0, 0), new THREE.Vector3(povOrientationDirection.x, povOrientationDirection.y, povOrientationDirection.z));

                            povProjectionRayProjection = povProjectionRay.recast(100);

                            resultFinalPoint = {
                                x: povProjectionRayProjection.origin.x,
                                y: povProjectionRayProjection.origin.y,
                                z: povProjectionRayProjection.origin.z
                            };

                            return resultFinalPoint;
                        }

                        function normalizePOVCoordinates(coordinates) {
                            if (coordinates && coordinates.z) {
                                coordinates.z = (-((coordinates.z) / coordinates.z) * 100);
                            }
                            return coordinates;
                        }
                        /* Add Welcome Message */
                        var povCoordinates = getCurrentPOVCoordinates(),
                            welcomePOIId = "welcome",
                            welcomeTextPOIId = "welcomeText";

                        awe.pois.add({id: welcomePOIId, position: povCoordinates});
                        awe.projections.add({
                            id: welcomeTextPOIId,
                            "geometry": {
                                "font_url": "https://raw.githubusercontent.com/AndrewRayCode/Big-Bubble/master/fonts/optimer_regular.typeface.js",
                                "parameters": {
                                    "height": "1",
                                    "size": "10"
                                },
                                "shape": "text",
                                "text": WelcomeLabel
                            },
                            scale: {
                                x: 1,
                                y: 1,
                                z: 1
                            },
                            postion: {x: 0, y: 10, z: 0},
                            material: {
                                type: 'phong',
                                color: 0xCCCCCC,
                            },
                            rotation: {x: 0, y: 50, z: 0},
                        }, {poi_id: welcomePOIId});

                    }
                },
                /* AWE Error Fall Back Script */
                {
                    capabilities: [],
                    files: [],
                    success: function () {
                        document.body.innerHTML = '<p>This demo currently requires a standards compliant mobile browser.';
                        return;
                    },
                },
            ]);
        }
    });
});
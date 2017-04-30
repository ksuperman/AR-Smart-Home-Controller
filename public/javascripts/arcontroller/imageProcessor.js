/* Initialize the Image Capture and Processing */
app = new Clarifai.App(
    'rGtYj5BIdSxO6J-0klt3QOTWQ6ZUDNu84WABTiXP',
    '5Jl4N_XBwxbIVPXBfVvD-KsSsAs_rOWD8wJxPAG8'
);

classOfInterest = ["window", "monitor", "laptop", "fridge", "lamp", "light", "bulb", "washing machine", "refrigerator"];

ObjectCount = 0;

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

function handleObjectDetection(objectClass) {

    var povCoordinates = getCurrentPOVCoordinates(),
        lampProjId,
        lampPoiId,
        windowProjId,
        windowPoiId,
        lampTextId,
        monProjId,
        monPoiId,
        monTextId,
        windowTextId,
        windowTextPoiId;

    console.log("povCoordinates ==> ", povCoordinates);

    switch (objectClass) {
        case "lamp":
            lampProjId = 'lampswitchP';
            lampPoiId = 'lampswitch';
            lampTextId = 'lampTextP';

            awe.pois.add({id: lampPoiId, position: povCoordinates});

            awe.projections.add({
                id: lampProjId,
                geometry: {shape: 'cube', width: 100, height: 100},
                scale: {
                    x: 10.00,
                    y: 10.00,
                    z: 10.00
                },
                postion: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: -50, z: 0},
                material: {
                    type: 'phong',
                    color: 0xCCCCCC,
                },
                texture: {path: '/models/power1.png'},
            }, {poi_id: lampPoiId});

            awe.projections.add({
                id: lampTextId,
                "geometry": {
                    "font_url": "https://raw.githubusercontent.com/AndrewRayCode/Big-Bubble/master/fonts/optimer_regular.typeface.js",
                    "parameters": {
                        "height": "1",
                        "size": "10"
                    },
                    "shape": "text",
                    "text": FloorLampLabel
                },
                scale: {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3
                },
                postion: {x: 0, y: 10, z: 0},
                material: {
                    type: 'phong',
                    color: 0xFFFFFF,
                },
                rotation: {x: 0, y: 50, z: 0},
                //texture: {path: '/models/news.mp4'},
            }, {poi_id: lampPoiId});

            break;

        case "computer":
            monProjId = 'momswitchP';
            monPoiId = 'monswitch';
            monTextId = 'monTextP';

            awe.pois.add({id: monPoiId, position: povCoordinates});

            awe.projections.add({
                id: monProjId,
                geometry: {shape: 'cube', width: 100, height: 100},
                scale: {
                    x: 15.00,
                    y: 15.00,
                    z: 15.00
                },
                postion: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: -50, z: 0},
                material: {
                    type: 'phong',
                    color: 0xFFFFFF,
                },
                texture: {path: '/models/powericon3.jpg'},
            }, {poi_id: monPoiId});

            awe.projections.add({
                id: monTextId,
                "geometry": {
                    "font_url": "https://raw.githubusercontent.com/AndrewRayCode/Big-Bubble/master/fonts/optimer_regular.typeface.js",
                    "parameters": {
                        "height": "1",
                        "size": "10"
                    },
                    "shape": "text",
                    "text": LaptopLabel
                },
                scale: {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3
                },
                //postion: {x: 100, y: 10, z: 0},
                material: {
                    type: 'phong',
                    color: 0xFFFFFF,
                },
                rotation: {x: 0, y: 50, z: 0},
            }, {poi_id: monPoiId});
            break;

        case "window":
            windowPoiId = 'window';
            windowTextPoiId = 'windowText';
            windowProjId = 'windowP';
            windowTextId = 'windowTextP';

            var povCoordinatesText = $.extend({},povCoordinates);
            povCoordinatesText.y += 20;

            awe.pois.add({id: windowPoiId, position: povCoordinates});
            awe.pois.add({id: windowTextPoiId, position: povCoordinatesText});

            awe.projections.add({
                id: windowProjId,
                geometry: {shape: 'cube', width: 100, height: 100},
                scale: {
                    x: 25,
                    y: 25,
                    z: 25
                },
                material: {
                    type: 'phong',
                    color: 0xCCCCCC,
                },
                rotation: {y: -100},
                texture: {path: '/models/news.mp4'},
            }, {poi_id: windowPoiId});

            awe.projections.add({
                id: windowTextId,
                "geometry": {
                    "font_url": "https://raw.githubusercontent.com/AndrewRayCode/Big-Bubble/master/fonts/optimer_regular.typeface.js",
                    "parameters": {
                        "height": "1",
                        "size": "10"
                    },
                    "shape": "text",
                    "text": WindowLabel
                },
                scale: {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3
                },
                postion: {x: 100, y: 300, z: 0},
                material: {
                    type: 'phong',
                    color: 0xFFFFFF,
                },
                rotation: {x: 0, y: 30, z: 0},
            }, {poi_id: windowTextPoiId});
            break;

        default:
            break;
    }

    ObjectCount++;
}

function processAPIResponse(response) {

    var imageClasses,
        i,
        classOfInterestString = classOfInterest.join(" "),
        classesFound = [],
        classFoundString = "";

    console.log('API Analysis Response ==> ', response);

    if (response && response.status === 200 && response.data && response.data.outputs && response.data.outputs[0] && response.data.outputs[0].data && response.data.outputs[0].data.concepts && response.data.outputs[0].data.concepts.length > 0) {
        imageClasses = response.data.outputs[0].data.concepts;
        for (i = 0; i < imageClasses.length; i++) {
            if (classOfInterestString.includes(imageClasses[i].name)) {
                classesFound.push(imageClasses[i].name);
            }
        }
        if (classesFound.length > 0) {
            classFoundString = classesFound.join(" ");
            if (classFoundString.includes("lamp") && classFoundString.includes("light") && classFoundString.includes("bulb")) {
                console.log("Lamp Detected");
                handleObjectDetection("lamp");
            } else if (classFoundString.includes("monitor") && classFoundString.includes("laptop")) {
                console.log("Computer Detected");
                handleObjectDetection("computer");
            } else if (classFoundString.includes("window")) {
                console.log("Window Detected");
                handleObjectDetection("window");
            }
        }
    } else {
        console.log("Invalid API Response");
    }
    setTimeout(captureImageForProcessing, 5000);
}

function processErrResponse(err) {
    console.log('error', err);
    setTimeout(captureImageForProcessing, 5000);
}

function processFrame(imageBitmap) {
    var image;

    photo = document.getElementById('image_capture');
    photo.width = imageBitmap.width;
    photo.height = imageBitmap.height;
    photo.getContext('2d').clearRect(0, 0, photo.width, photo.height);
    photo.getContext('2d').drawImage(imageBitmap, 0, 0);
    image = photo.toDataURL();
    image = image.split(',')[1];

    /* Analyze Surroundings */
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(processAPIResponse.bind(this), processErrResponse.bind(this));
}

function captureImageForProcessing() {
    if (captureDevice.videoElement.videoWidth) {
        console.log("Ready to Capture Scene !!!");
        captureDevice.grabFrame().then(processFrame.bind(this));
    } else {
        console.log("Error in getting Camera State");
    }
}

function initializeImageCapture() {
    console.log("Checking If AWE is Ready !?");
    if (awe && awe.ready() && awe.video_stream() && awe.video_stream().get_stream() && awe.video_stream().get_stream().getVideoTracks()) {
        console.log("AWE is Ready !! Begin Analyzing Scene !!");
        captureDevice = new imagecapture.ImageCapture(awe.video_stream().get_stream().getVideoTracks()[0]);
        setTimeout(captureImageForProcessing.bind(this), 10000);
    } else {
        console.log("AWE is Not Ready !! Trying Again in Sometime...");
        setTimeout(initializeImageCapture, 5000);
    }
}

initializeImageCapture();

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.imagecapture = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  // Copyright 2016 Google Inc.
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //      http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  //
  ////////////////////////////////////////////////////////////////////////////////

  // MediaStream ImageCapture polyfill

  var ImageCapture = exports.ImageCapture = window.ImageCapture;

  if (typeof ImageCapture === 'undefined') {
    exports.ImageCapture = ImageCapture = function () {

      /**
       * TODO https://www.w3.org/TR/image-capture/#constructors
       *
       * @param {MediaStreamTrack} videoStreamTrack - A MediaStreamTrack of the 'video' kind
       */
      function ImageCapture(videoStreamTrack) {
        _classCallCheck(this, ImageCapture);

        if (videoStreamTrack.kind !== 'video') throw new DOMException('NotSupportedError');

        this._videoStreamTrack = videoStreamTrack;
        if (!('readyState' in this._videoStreamTrack)) {
          // Polyfill for Firefox
          this._videoStreamTrack.readyState = 'live';
        }

        // MediaStream constructor not available until Chrome 55 - https://www.chromestatus.com/feature/5912172546752512
        this._previewStream = new MediaStream([videoStreamTrack]);
        this.videoElement = document.createElement('video');
        this.videoElement.src = URL.createObjectURL(this._previewStream);
        this.videoElement.muted = true;
        this.videoElement.play(); // required by Firefox

        this.canvasElement = document.createElement('canvas');
        // TODO Firefox has https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
        this.canvas2dContext = this.canvasElement.getContext('2d');
      }

      /**
       * https://w3c.github.io/mediacapture-image/index.html#dom-imagecapture-videostreamtrack
       * @return {MediaStreamTrack} The MediaStreamTrack passed into the constructor
       */


      _createClass(ImageCapture, [{
        key: 'getPhotoCapabilities',


        /**
         * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-getphotocapabilities
         * @return {Promise<PhotoCapabilities>} Fulfilled promise with [PhotoCapabilities](https://www.w3.org/TR/image-capture/#idl-def-photocapabilities) object on success, rejected promise on failure
         */
        value: function getPhotoCapabilities() {
          return new Promise(function executorGPC(resolve, reject) {
            // TODO see https://github.com/w3c/mediacapture-image/issues/97
            var MediaSettingsRange = {
              current: 0, min: 0, max: 0
            };
            resolve({
              exposureCompensation: MediaSettingsRange,
              exposureMode: 'none',
              fillLightMode: 'none',
              focusMode: 'none',
              imageHeight: MediaSettingsRange,
              imageWidth: MediaSettingsRange,
              iso: MediaSettingsRange,
              redEyeReduction: false,
              whiteBalanceMode: 'none',
              zoom: MediaSettingsRange
            });
            reject(new DOMException('OperationError'));
          });
        }

        /**
         * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-setoptions
         * @param {Object} photoSettings - Photo settings dictionary, https://www.w3.org/TR/image-capture/#idl-def-photosettings
         * @return {Promise<void>} Fulfilled promise on success, rejected promise on failure
         */

      }, {
        key: 'setOptions',
        value: function setOptions() {
          var photoSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          return new Promise(function executorSO(resolve, reject) {
            // TODO
          });
        }

        /**
         * TODO
         * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-takephoto
         * @return {Promise<Blob>} Fulfilled promise with [Blob](https://www.w3.org/TR/FileAPI/#blob) argument on success; rejected promise on failure
         */

      }, {
        key: 'takePhoto',
        value: function takePhoto() {
          var self = this;
          return new Promise(function executorTP(resolve, reject) {
            // `If the readyState of the MediaStreamTrack provided in the constructor is not live,
            // return a promise rejected with a new DOMException whose name is "InvalidStateError".`
            if (self._videoStreamTrack.readyState === 'live') {
              // -- however, checking for `live` alone doesn't guarantee the video is ready
              if (self.videoElement.videoWidth) {
                try {
                  self.canvasElement.width = self.videoElement.videoWidth;
                  self.canvasElement.height = self.videoElement.videoHeight;
                  self.canvas2dContext.drawImage(self.videoElement, 0, 0);
                  self.canvasElement.toBlob(function (blob) {
                    resolve(blob);
                  });
                } catch (error) {
                  reject(new DOMException('UnknownError'));
                }
              } else {
                reject(new DOMException('UnknownError'));
              }
            } else {
              reject(new DOMException('InvalidStateError'));
            }
          });
        }

        /**
         * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-grabframe
         * @return {Promise<ImageBitmap>} Fulfilled promise with [ImageBitmap](https://www.w3.org/TR/html51/webappapis.html#webappapis-images) argument on success; rejected promise on failure
         */

      }, {
        key: 'grabFrame',
        value: function grabFrame() {
          var self = this;
          return new Promise(function executorGF(resolve, reject) {
            if (self._videoStreamTrack.readyState === 'live') {
              if (self.videoElement.videoWidth) {
                try {
                  // videoWidth is available after videoElement.onloadedmetadata fires
                  self.canvasElement.width = self.videoElement.videoWidth;
                  self.canvasElement.height = self.videoElement.videoHeight;
                  // The video has an image after videoElement.oncanplay triggers
                  self.canvas2dContext.drawImage(self.videoElement, 0, 0);
                  // TODO polyfill https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapFactories/createImageBitmap for IE
                  resolve(window.createImageBitmap(self.canvasElement));
                } catch (error) {
                  reject(new DOMException('UnknownError'));
                }
              } else {
                reject(new DOMException('UnknownError'));
              }
            } else {
              reject(new DOMException('InvalidStateError'));
            }
          });
        }
      }, {
        key: 'videoStreamTrack',
        get: function get() {
          return this._videoStreamTrack;
        }
      }]);

      return ImageCapture;
    }();
  }
});
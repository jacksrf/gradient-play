import * as THREE from 'https://cdn.skypack.dev/three@v0.122.0';

var fragmentShader = {
  vec3 rgb(float r, float g, float b) {
      return vec3(r / 255., g / 255., b / 255.);
  }

  vec3 rgb(float c) {
      return vec3(c / 255., c / 255., c / 255.);
  }

  uniform vec3 u_bg;
  uniform vec3 u_bgMain;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_time;

  varying vec2 vUv;
  varying float vDistortion;

  void main() {
      vec3 bg = rgb(u_bg.r, u_bg.g, u_bg.b);
      vec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);
      vec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);
      vec3 bgMain = rgb(u_bgMain.r, u_bgMain.g, u_bgMain.b);

      float noise1 = snoise(vUv + u_time * 0.08);
      float noise2 = snoise(vUv * 2. + u_time * 0.1);

      vec3 color = bg;
      color = mix(color, c1, noise1 * 0.6);
      color = mix(color, c2, noise2 * .4);

      color = mix(color, mix(c1, c2, vUv.x), vDistortion);

      float border = smoothstep(0.1, 0.6, vUv.x);

      color = mix(color, bgMain, 1. -border);

      gl_FragColor = vec4(color, 1.0);
  }
};
console.log(fragmentShader)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgb(r, g, b) {
    return new THREE.Vector3(r, g, b);
}

function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};
// My function to interpolate between two colors completely, returning an array
function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
}

var colorsArray = interpolateColors("rgb(0, 48, 91)", "rgb(0, 52, 125)", 1000);

// var boom = gradient('00305b', '00347d', 1000);
var direction = "increase";
var minG = 155;
var maxG = 255
var lastG = 155;
document.addEventListener("DOMContentLoaded", function(e) {

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement )

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );

    let vCheck = false;

    camera.position.z = 5;

    var randomisePosition = new THREE.Vector2(1, 2);

    var R = function(x, y, t) {
       return 155 + x;
    }

    var G = function(x, y, t) {
      return 155 + x;
    }

    var B = function(x, y, t) {
      return 155 + x;
    }
    let sNoise = document.querySelector('#snoise-function').textContent
    let geometry = new THREE.PlaneGeometry(window.innerWidth / 2, 400, 100, 100);
    console.log(document.querySelector('#fragment-shader').textContent)
    let material = new THREE.ShaderMaterial({
        uniforms: {
            u_bg: {type: 'v3', value: rgb(155, 155, 155)},
            u_bgMain: {type: 'v3', value: rgb(155, 155, 155)},
            u_color1: {type: 'v3', value: rgb(155, 155, 155)},
            u_color2: {type: 'v3', value: rgb(255, 255, 255)},
            u_time: {type: 'f', value: 30},
            u_randomisePosition: { type: 'v2', value: randomisePosition }
        },
        fragmentShader: sNoise + document.querySelector('#fragment-shader').textContent,
        vertexShader: sNoise + document.querySelector('#vertex-shader').textContent,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-200, 270, -280);
    mesh.scale.multiplyScalar(4);
    mesh.rotationX = 1.0;
    mesh.rotationY = 0.0;
    mesh.rotationZ = 0.1;
    scene.add(mesh);

    renderer.render( scene, camera );
    let t = 0;
    let j = 0;
    let x = randomInteger(0, 32);
    let y = randomInteger(0, 32);
    const animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(j, j);
        // console.log(colorsArray[Math.round(t)])
        mesh.material.uniforms.u_color1.value = new THREE.Vector3( R(x,y,t), G(x,y,t), B(x,y,t) );

        // mesh.material.uniforms.u_color1.value = new THREE.Vector3(colorsArray[Math.round(t)][0],colorsArray[Math.round(t)][1],colorsArray[Math.round(t)][2]);
// console.log(mesh.material.uniforms.u_color1.value)
        mesh.material.uniforms.u_time.value = t;
        if(t % 0.1 == 0) {
            if(vCheck == false) {
                x -= 1;
                if(x <= 0) {
                    vCheck = true;
                }
            } else {
                x += 1;
                if(x >= 1000) {
                    vCheck = false;
                }

            }
        }

        // Increase t by a certain value every frame
        j = j + 0.01;
        t = t + 0.05;
    };
    animate();

});

$(window).on('load', function() {
  $('.change_circles').click(function() {
    console.log('NEXT')
    var lastID = $('.circles .circle:first').attr('id')
    var newID = $('.circles .circle:last').attr('id')
    $('.circles').prepend($('.circles .circle:last').addClass('tempLast'))
    setTimeout(function() {
      $('.circles .circle.tempLast').removeClass('tempLast')
    }, 1)
    $('body').removeClass(lastID)
    $('body').addClass(newID)
  })
})

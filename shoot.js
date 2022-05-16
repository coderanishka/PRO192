AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        console.log("not")
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.5,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");
        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y + 3,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        //set the bullet as the dynamic entity
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "50",
        });

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
 removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    var enemyCount = document.querySelector('#countEnemy')
    var c = parseInt(enemyCount.getAttribute('text').value)
    //bullet element
    var element = e.detail.target.el;
    //element which is hit
    var elementHit = e.detail.body.el;
    
    // console.log(element)
    // console.log(elementHit)


    if (elementHit.id.includes("enemy")) {
      //Add code here
      // console.log('removed')
      c -= 1
      scene.removeChild(elementHit);

      enemyCount.setAttribute('text', {value: c})
    }
    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene   
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});


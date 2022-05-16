AFRAME.registerComponent('enemy-bullets', {
    init: function(){
        setInterval(this.shootEnemy, 10000)
    },
    shootEnemy: function(){
        var e = document.querySelectorAll('.enemy')
        for(var i = 0; i<e.length; i++){
            var bullet = document.createElement("a-entity")
            bullet.setAttribute('geometry', {primitive: 'sphere', radius: 0.1, })
            bullet.setAttribute('material', 'color', 'orange')
            var pos = e[i].getAttribute('position')
            bullet.setAttribute('position', {x: pos.x + 1.5, y: pos.y + 3.5, z: pos.z})
            var scene = document.querySelector('#scene')
            scene.appendChild(bullet)
            
            var enemy = e[i].object3D // shooting direction
            var player = document.querySelector('#weapon').object3D
            var pos1 = new THREE.Vector3()
            var pos2 = new THREE.Vector3()
            player.getWorldPosition(pos1)
            enemy.getWorldPosition(pos2)

            var direction = new THREE.Vector3()
            direction.subVectors(pos1, pos2).normalize()
            bullet.setAttribute('velocity', direction.multiplyScalar(10))
            bullet.setAttribute('dynamic-body', {shape: 'sphere', mass:  0})
            
            // text/score
            var element = document.querySelector('#countLife')
            var life = parseInt(element.getAttribute('text').value)
            // console.log(element)
            // console.log(life)

            // collision event on bullets
            bullet.addEventListener('collide',function(e){
                if(e.detail.body.el.id === 'weapon'){
                    if(life>0){
                        life -= 1
                        element.setAttribute('text', {value: life})
                        var tank = document.querySelectorAll('.enemy')
                        console.log(tank)
                        for(var i = 0; i < tank.length; i++){
                            scene.removeChild(tank[i])
                        }
                    }
                    if(life<=0){
                        var txt = document.querySelector('#over')
                        txt.setAttribute('visible', true)
                        // removal of tanks

                    }
                }
            })
        }
    }
})
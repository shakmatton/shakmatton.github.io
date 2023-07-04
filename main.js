import {loadGLTF} from "./loader.js" 

const THREE = window.MINDAR.IMAGE.THREE

document.addEventListener("DOMContentLoaded", () => {
    const start = async() => {
                        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./targets.mind"
        })

        const {scene, camera, renderer} = mindarThree

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
        scene.add(light)

        // ===================== GLTF LOADER ======================

        const apple = await loadGLTF("./assets/maçã/Maçã.gltf")
        const pepper = await loadGLTF("./assets/pimenta/Pimenta.gltf")
        const carrot = await loadGLTF("./assets/cenoura/Cenoura.gltf")
        const pumpkin = await loadGLTF("./assets/abóbora/Abóbora.gltf")

        apple.scene.scale.set(0.05, 0.05, 0.05)
        apple.scene.position.set(-0.44, 0.09, 0)
        
        pepper.scene.scale.set(0.4, 0.4, 0.4)
        pepper.scene.position.set(-0.01, 0.48, 0)

        carrot.scene.scale.set(0.275, 0.275, 0.275)
        carrot.scene.position.set(-0.285, 0.425, 0)

        pumpkin.scene.scale.set(0.25, 0.25, 0.25)
        pumpkin.scene.position.set(0.404, 0.182, 0)
        pumpkin.scene.rotation.set(0.6, 0.2, 0)

        // ===================== ANCHOR ======================

        const chefAnchor = mindarThree.addAnchor(0)
        
        chefAnchor.group.add(apple.scene)
        chefAnchor.group.add(pepper.scene)
        chefAnchor.group.add(carrot.scene)
        chefAnchor.group.add(pumpkin.scene)

        // ===================== ANIMATION ======================
        
        const appleMixer = new THREE.AnimationMixer(apple.scene)
        const pepperMixer = new THREE.AnimationMixer(pepper.scene)
        const carrotMixer = new THREE.AnimationMixer(carrot.scene)
        const pumpkinMixer = new THREE.AnimationMixer(pumpkin.scene)

        const appleAction = appleMixer.clipAction(apple.animations[0])        
        const pepperAction = pepperMixer.clipAction(pepper.animations[0])
        const carrotAction = carrotMixer.clipAction(carrot.animations[0])
        const pumpkinAction = pumpkinMixer.clipAction(pumpkin.animations[0])
        
        appleAction.play()
        pepperAction.play()
        carrotAction.play()
        pumpkinAction.play()

       /* const appleMixer = new THREE.AnimationMixer(apple.scene)
        apple.animations.forEach((clip) => {
            appleMixer.clipAction(clip).play(); 
        }); */

        const clock = new THREE.Clock()

        await mindarThree.start()

        renderer.setAnimationLoop(() => {

            const delta = clock.getDelta()

            appleMixer.update(delta)
            pepperMixer.update(delta)
            carrotMixer.update(delta)
            pumpkinMixer.update(delta)

            renderer.render(scene, camera)
        })
    }
    start()
})

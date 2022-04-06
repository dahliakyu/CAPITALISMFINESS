import React, { Component } from "react";
import * as THREE from 'three';
import './Methodology.css';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const style = {
    height: 500 // control scene size by setting container dimensions
};

class Elephant extends Component {
    componentDidMount() {
        this.sceneSetup();
        this.addLights();
        this.loadTheModel();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }


    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 500; 
        this.controls = new OrbitControls( this.camera, this.mount );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref
    };

    loadTheModel = () => {
        // instantiate a loader
        const loader = new STLLoader();



        // load a resource
        loader.load(
            // resource URL relative to the /public/index.html of the app
            'Bunny.stl',
            //https://ozeki.hu/attachments/16/Stanford_Bunny_sample.stl
            geometry => {
                const el = new THREE.Mesh(geometry)
                this.scene.add(el)
            

                // change some custom props of the element: placement, color, rotation, anything that should be
                // done once the model was loaded and ready for display
                el.position.set(0, -150,0 );
                el.material.color.set(0x50C878);
                el.rotation.x = 23.5;

                // make this element available inside of the whole component to do any animation later
                this.model = el;
            },
            // called when loading is in progresses
             ( xhr ) => {

                const loadingPercentage = Math.ceil(xhr.loaded / xhr.total * 100);
                console.log( ( loadingPercentage ) + '% loaded' );

                // update parent react component to display loading percentage
                this.props.onProgress(loadingPercentage);
            },
            // called when loading has errors
             ( error ) => {

                console.log( 'An error happened:' + error );

            }
        );
    };

    // adding some lights to the scene
    addLights = () => {
        const lights = [];

        // set color and intensity of lights
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        // place some lights around the scene for best looks and feel
        lights[ 0 ].position.set( 0, 2000, 0 );
        lights[ 1 ].position.set( 1000, 2000, 1000 );
        lights[ 2 ].position.set( - 1000, - 2000, - 1000 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };

    startAnimationLoop = () => {
        // slowly rotate an object
        if (this.model) this.model.rotation.z += 0.005;

        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
        return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}

class Methodology extends Component {
    state = {isMounted: true};

    render() {
        const {isMounted = true, loadingPercentage = 0} = this.state;
        return (
            <div className="App">
                <h1 className="text-title">If you cannot afford any of our products, <br></br>here is a free 3D-cyber bunny for you to enjoy capitalism!</h1>
                <>
                    {isMounted && <Elephant onProgress={loadingPercentage => this.setState({ loadingPercentage })} />}
                    {isMounted && loadingPercentage === 100 && <div className="text-caption">Scroll to zoom, drag to rotate</div>}
                    {isMounted && loadingPercentage !== 100 && <div className="text-caption">Loading Model: {loadingPercentage}%</div>}
                </>
            </div>
            
        )
    }
}

export default Methodology;
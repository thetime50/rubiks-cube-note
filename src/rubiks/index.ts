import { PerspectiveCamera, Scene, WebGLRenderer, AxesHelper, LineDashedMaterial} from "three";
import createCamera from "./components/camera";
import createScene from "./components/scene";
import createRenderer from "./components/renderer";
import {Cube} from "./core/cube";
import Control, {MouseControl, TouchControl} from "./core/control";
import { dbg, initDbg } from "./util/dbg";

const setSize = (container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    // Set the camera's aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight; // 设置长宽比 PerspectiveCamera 的第二个参数
    camera.updateProjectionMatrix(); // 手动更新相机投影矩阵

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Rubiks {
    private camera: PerspectiveCamera; // 透视相机
    private scene: Scene;
    private cube: Cube | undefined;
    private renderer: WebGLRenderer;
    private _controls: Control[] = [];
    public constructor(container: Element) {
        this.camera = createCamera();
        this.scene = createScene("#478967");
        this.renderer = createRenderer();
        initDbg(this.renderer, this.scene, this.camera,);
        container.appendChild(this.renderer.domElement);

        // auto resize
        window.addEventListener("resize", () => {
            setSize(container, this.camera, this.renderer);
            this.render();
        });
        setSize(container, this.camera, this.renderer); // 屏幕 相机 渲染 适配
        this.setOrder(3); // 设置阶数

        this.startAnimation();
    }
    
    // 添加辅助坐标轴
    public addWorldAxes() {
        // https://threejs.org/docs/#api/zh/helpers/AxesHelper
        let addWorldAxes = new AxesHelper(3);
        // (addWorldAxes.material as LineDashedMaterial).dashSize = 0.2;
        // (addWorldAxes.material as LineDashedMaterial).gapSize = 0.2;
        let dashe = new LineDashedMaterial({
            vertexColors: true,
            toneMapped: false,
            color: 0xffff00,
            linewidth: 0.6,
            dashSize: 0.05,//显示线段的大小。默认为3。
            gapSize: 0.05,//间隙的大小。默认为1
        })
        addWorldAxes.material = dashe
        addWorldAxes.computeLineDistances();
        this.scene.add(addWorldAxes);

    }
    public setOrder(order: number) {
        this.scene.remove(...this.scene.children);
        if (this._controls.length > 0) {
            this._controls.forEach((control) => control.dispose());
        }
        this.addWorldAxes()

        const cube = new Cube(order);
        this.scene.add(cube);
        this.scene.add(cube.haxes); // 添加物体辅助坐标轴
        this.scene.add(cube.daxes); // 添加物体辅助坐标轴
        this.cube = cube;
        this.render();

        const winW = this.renderer.domElement.clientWidth;
        const winH = this.renderer.domElement.clientHeight;
        const coarseSize = cube.getCoarseCubeSize(this.camera, {w: winW, h: winH}); // 渲染尺寸

        const ratio = Math.max(2.2 / (winW / coarseSize), 2.2 / (winH / coarseSize));
        this.camera.position.z *= ratio; // 这里每次累乘有点奇怪
        // 下面这两个控制器只是绑定的事件不一样
        this._controls.push(
            new MouseControl(this.camera, this.scene, this.renderer, cube),
            new TouchControl(this.camera, this.scene, this.renderer, cube)
        );

        this.render();
    }

    /**
     * 打乱
     */
    public disorder() {
        if (this.cube) {

        }
    }

    /**
     * 还原
     */
    public restore() {
        if (this.cube) {
            this.cube.restore();
            this.render();
        } else {
            console.error("RESTORE_ERROR: this.cube is undefined.");
        }
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }

    private startAnimation() {
        const animation = (time: number) => { // 页面运行时间
            time /= 1000; // convert to seconds
            if (this.cube) {
                if (time < 2) {
                    this.cube.position.z = (-1 + time / 2) * 100;
                } else {
                    this.cube.position.z = 0;
                }
                const dis = time;
                this.cube.position.y = Math.sin(dis) * 0.1; // 悬浮动画
            }

            this.render();
            requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }
}

export default Rubiks;

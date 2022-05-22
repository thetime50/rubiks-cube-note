import {PerspectiveCamera} from "three";

const createCamera = () => {
    // http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/cameras/PerspectiveCamera
    // https://en.wikipedia.org/wiki/Viewing_frustum
    const camera = new PerspectiveCamera(
        45, // 视锥体垂直视野角度
        1, // 视锥体长宽比 // 看不出效果
        0.1, // 显示深度范围
        100
    );

    camera.position.set(0, 0, 15);

    return camera;
};

export default createCamera;
